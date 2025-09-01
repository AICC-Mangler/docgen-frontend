import React, { useEffect, useState } from 'react'
import { api } from '../../../api';
import { useNavigate } from 'react-router-dom';
import DocumentQuestion from './component/documentQuestion';
import RequirementDocumentList from './component/RequirementDocumentList';

const DocumentRequest: React.FC = () => {
  const [requirement, setRequirement] = useState<string>();
  const [documentList, setDocumentList] = useState([]);
  const navigate = useNavigate();

  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequirement(e.target.value);
  };

  const documentRequestHandler = async ()=>{
    const response = await api.post("/document/requirement/", {
      owner_id : "backend1",
      project_id : "backend4",
      requirement : requirement
    })
    console.log(response);
  }

  const documentListUpdate = async ()=>{
    const response = await api.get("/document/requirement/user/backend1")
    if(response.data.success){
      setDocumentList(response.data.data)
    }
  }

  const documentViewHandler = (document_id:string)=>{
    navigate(`/prd-viewer-test/${document_id}`)
  }

  const test = (qna:string[])=>{
    console.log(qna);
  }

  return (
    <div className='border h-[600px]'>
      <div className='flex'>
        <button className='w-[8rem] h-full' onClick={documentListUpdate}>리스트 갱신</button>
        <div  className='border overflow-y-scroll h-[20rem]'>
          <RequirementDocumentList documentList={documentList}/>
        </div>
      </div>
    </div>
  )
}

export default DocumentRequest
