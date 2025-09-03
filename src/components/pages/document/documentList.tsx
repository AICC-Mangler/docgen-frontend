import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../api';
import DocumentListItem from './component/DocumentListItem';
import { useAuthenticationStore } from '../../../stores';

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

const DocumentList = () => {
  const { project_id } = useParams();
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

  const requirementViewerHandler = (document_id: string) => {
    navigate(`/documents/prd_viewer/${document_id}`);
  };
  const functionalViewerHandler = (document_id: string) => {
    navigate(`/documents/fsd_viewer/${document_id}`);
  };
  const PolicyViewerHandler = (document_id: string) => {
    navigate(`/documents/spd_viewer/${document_id}`);
  };
  const DOCUMENT_VIEWER: document_viewer = {
    requirement_document: requirementViewerHandler,
    functional_document: functionalViewerHandler,
    policy_document: PolicyViewerHandler,
  };

  const DOCUMENT_GEN_FUNC: document_generator = {
    requirement_document: (project_id: string) => {
      navigate(`/documents/generate/${project_id}`);
    },
    functional_document: (project_id: string) => {
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

  const get_Click_Handler = (status: string, doc_type: string, id: string) => {
    if (status === 'error' || status === 'none')
      return () => DOCUMENT_GEN_FUNC[doc_type](project_id || '');
    if (status === 'finished') return () => DOCUMENT_VIEWER[doc_type](id);
    if (status === 'progress') return () => {};
    return () => {};
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">문서 목록</h1>
          </div>
        </div>

        <div>
          <div className="m-auto p-2 flex flex-col gap-2 w-full">
            {documents
              ? DOCUMENT_TYPES.map((doc, idx) => {
                  const docs = documents[doc.name];
                  if (docs === undefined)
                    return (
                      <DocumentListItem
                        key={idx}
                        display={doc.display}
                        create_date={' '}
                        status={'none'}
                        onClick={get_Click_Handler('none', doc.name, 'no_id')}
                      />
                    );
                  return (
                    <DocumentListItem
                      key={idx}
                      display={doc.display}
                      create_date={docs.create_date.substring(0, 10)}
                      status={docs.status}
                      onClick={get_Click_Handler(
                        docs.status,
                        doc.name,
                        docs.id,
                      )}
                    />
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
