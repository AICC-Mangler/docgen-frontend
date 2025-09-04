import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../api';
import DocumentListItem from './DocumentListItem';
import { useAuthenticationStore } from '../../../../stores';

type document_info = {
  id: string;
  type: string;
  status: string;
  create_date: string;
};

type document_dict = {
  [key: string]: document_info;
};

type document_viewer = {
  [key: string]: (id: string) => void;
};

type document_generator = {
  [key: string]: (id: string) => void;
};

const DOCUMENT_TYPES = [
  {
    name: 'requirement_document',
    display: '요구사항 정의서',
  },
  {
    name: 'functional_document',
    display: '기능 명세서',
  },
  {
    name: 'policy_document',
    display: '정책 정의서',
  },
];

const DocumentList = ({project_id}:{project_id:string|undefined}) => {
  const [documents, setDocuments] = useState<document_dict>();
  const navigate = useNavigate();
  const { user } = useAuthenticationStore();
  const memberId = user?.id || 0;

  useEffect(() => {
    loadList();
    const interval = setInterval(async () => {
      const docs = await loadList();
      if (docs === undefined) {
        return;
      }
      let check_progress = false;
      DOCUMENT_TYPES.forEach((doc_type) => {
        const doc = docs[doc_type.name];
        if (doc === undefined) return;
        if (doc.status === 'progress') {
          check_progress = true;
        }
      });
      if (check_progress === false) {
        return clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(documents);
  }, [documents]);

  const loadList = async () => {
    const result = await api.get(`document/project/${project_id}`);
    if (result.data && result.data.success) {
      const docs = result.data.data;
      setDocuments(docs);
      return docs;
    }
    return undefined;
  };

  const redirect_viewer = (doc_type: string, document_id : string, project_id: string)=>{
    navigate(`/documents/viewer?document_id=${document_id}&project_id=${project_id}&document_type=${doc_type}`);
  }

  const requirementViewerHandler = (document_id: string) => {
    redirect_viewer("requirement",document_id,project_id||" ")
  };
  const functionalViewerHandler = (document_id: string) => {
    redirect_viewer("functional",document_id,project_id||" ")
  };
  const PolicyViewerHandler = (document_id: string) => {
    redirect_viewer("policy",document_id,project_id||" ")
  };
  const DOCUMENT_VIEWER: document_viewer = {
    requirement_document: requirementViewerHandler,
    functional_document: functionalViewerHandler,
    policy_document: PolicyViewerHandler,
  };

  const DOCUMENT_DELETE : document_viewer= {
    requirement_document: async (id:string)=>{
      await api.delete(`document/requirement/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    functional_document: async  (id:string)=>{
      await api.delete(`document/functional/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    policy_document: async  (id:string)=>{ 
      await api.delete(`document/policy/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  };

  const DOCUMENT_GEN_FUNC: document_generator = {
    requirement_document: (project_id: string) => {
      navigate(`/documents/generate?project_id=${project_id}`);
    },
    functional_document: (project_id: string) => {
      if(documents===undefined||documents["requirement_document"] === undefined) return;
      if(documents["requirement_document"].status != "finished") return;
      const result = api.post('document/functional', {
        project_id: project_id,
        owner_id: `${memberId}`,
      });
      console.log(result);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    policy_document: (project_id: string) => {
      if(documents===undefined||documents["functional_document"] === undefined) return;
      if(documents["functional_document"].status != "finished") return;

      const result = api.post('document/policy', {
        project_id: project_id,
        owner_id: `${memberId}`,
      });
      console.log(result);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  };

  const DOCUMENT_CREATABLE : {[key:string]:boolean}= {
    requirement_document: true,
    functional_document: !((documents===undefined||documents["requirement_document"] === undefined)||documents["requirement_document"].status != "finished"),
    policy_document:!((documents===undefined||documents["functional_document"] === undefined)||(documents["functional_document"].status != "finished"))
  };

  const get_Click_Handler = (status: string, doc_type: string, id: string) => {
    if (status === 'error' || status === 'none')
      return () => DOCUMENT_GEN_FUNC[doc_type](project_id || '');
    if (status === 'finished') return () => DOCUMENT_VIEWER[doc_type](id);
    if (status === 'progress') return () => {};
    return () => {};
  };


  
  return (
    <div className="m-auto p-2 flex flex-col gap-2 w-full text-black">
    {documents
      ? DOCUMENT_TYPES.map((doc, idx) => {
          const docs = documents[doc.name];
          const creatable = DOCUMENT_CREATABLE[doc.name]

          if (docs === undefined)
            return (
              <DocumentListItem
                key={idx}
                display={doc.display}
                create_date={'생성되지 않음'}
                status={'none'}
                creatable={creatable}
                onClick={get_Click_Handler('none', doc.name, 'no_id')}
                onDelete={()=>{}}
              />
            );
          return (
            <DocumentListItem
              key={idx}
              display={doc.display}
              create_date={docs.status==="progress"?"AI가 문서를 작성하고 있습니다.":docs.create_date.substring(0, 10)}
              status={docs.status}
              creatable={creatable}
              onClick={get_Click_Handler(
                docs.status,
                doc.name,
                docs.id,
              )}
              onDelete={(()=>DOCUMENT_DELETE[doc.name](docs.id))}
            />
          );
        })
      : ''}
  </div>
  );
};

export default DocumentList;
