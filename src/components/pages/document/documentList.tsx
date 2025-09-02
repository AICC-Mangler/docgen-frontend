import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api'
import DocumentListItem from './component/DocumentListItem'



type document_info = {
  id : string
  type : string
  status : string
  create_date : string
}

type document_dict = {
  [key: string]:document_info
}

type document_viewer = {
  [key: string]:(id:string)=>void
}

type document_generator = {
  [key: string]:(id:string)=>void
}


const DOCUMENT_TYPES = [{
  name:"requirement_document",
  display: "요구사항 정의서"
},{
  name:"functional_document",
  display : "기능 명세서"
},{
  name:"policy_document",
  display : "정책 정의서"
}
]

const DOCUMENT_DOMAIN = [
  {
    name:"requirement_document",
    domain: "requirement"
  },{
    name:"functional_document",
    domain : "functional"
  },{
    name:"policy_document",
    domain : "policy"
  }
]


const DocumentList = () => {
  const {project_id} = useParams()
  const [documents, setDocuments] = useState<document_dict>();
  const navigate = useNavigate();


  useEffect(()=>{
    loadList();
    const interval = setInterval(async() => {
      const docs = await loadList();
      if(docs === undefined){
        return;
      }
      let check_progress = false;
      DOCUMENT_TYPES.forEach((doc_type)=>{
        const doc = docs[doc_type.name];
        if(doc === undefined) return;
        if(doc.status === "progress"){
          check_progress = true
        }
      });
      if(check_progress === false){
        return clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  },[])

  useEffect(()=>{console.log(documents)},[documents])

  const loadList = async()=>{
    const result = await api.get(`document/project/${project_id}`);
    if(result.data && result.data.success){
      const docs = result.data.data;
      setDocuments(docs);
      return docs;
    }
    return undefined
  }

  const requirementViewerHandler = (document_id:string)=>{
    navigate(`/prd-viewer/${document_id}`)
  }
  const functionalViewerHandler = (document_id:string)=>{
    navigate(`/fsd-viewer/${document_id}`)
  }
  const PolicyViewerHandler = (document_id:string)=>{
    navigate(`/spd-viewer/${document_id}`)
  }
  const DOCUMENT_VIEWER : document_viewer = {
    requirement_document:requirementViewerHandler,
    functional_document:functionalViewerHandler,
    policy_document:PolicyViewerHandler
  }

  const DOCUMENT_GEN_FUNC : document_generator = {
    requirement_document: (project_id : string)=>{
      navigate(`/generate-document/${project_id}`)
    },
    functional_document: (project_id : string)=>{
      const result = api.post("document/functional",{
        project_id:project_id, owner_id:"test"
      })
      console.log(result);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    policy_document: (project_id : string)=>{
      const result = api.post("document/policy",{
        project_id:project_id, owner_id:"test"
      })
      console.log(result);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
  }

  return (
    <div>
      <div className='m-auto p-2 flex flex-col gap-2 w-[25rem]'>
        {
          documents?DOCUMENT_TYPES.map((doc, idx)=>{
            const docs = documents[doc.name];
            if(docs === undefined)return(
              <DocumentListItem
                key={idx}
                display={doc.display}
                create_date={" "}
                status={"none"}
                onClick={()=>DOCUMENT_GEN_FUNC[doc.name](project_id||"")}
              />
            );
            return(
              <DocumentListItem
                key={idx}
                display={doc.display}
                create_date={docs.create_date.substring(0,10)}
                status={docs.status}
                onClick={()=>docs.status==="error"?DOCUMENT_GEN_FUNC[doc.name](project_id||""):DOCUMENT_VIEWER[doc.name](docs.id)}
              />
            )
          }):""
        }
      </div>
    </div>
  )
}

export default DocumentList
