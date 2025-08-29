import React, { useState } from 'react'
import { api } from '../../../api';

const DocumentRequest: React.FC = () => {
  const [requirement, setRequirement] = useState<string>();
  const [documentList, setDocumentList] = useState();

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
    const response = await api.get("/document/requirement/backend1")
    console.log(response)
  }

  return (
    <div className='border h-[600px]'>
      <div className='border-black border w-[25rem] h-[6rem] p-2'>
        <div className='flex justify-between w-full h-full cursor-pointer'>
          <textarea className='focus:outline-none w-[17rem] h-full resize-none' onChange={textHandler} value={requirement} />
          <button className='w-[8rem] h-full' onClick={documentRequestHandler}>확인</button>
        </div>
      </div>
      <button className='w-[8rem] h-full' onClick={documentListUpdate}>리스트</button>
    </div>
  )
}

export default DocumentRequest
