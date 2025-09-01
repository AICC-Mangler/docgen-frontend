import React from 'react'
type document_info = {
  id: string,
  project_id : string,
  owner_id : string,
  status: string,
  create_date: string
}
const DocumentStatus = ({document}:{document:document_info}) => {
  return (
    <div>
      <div>id : {document.id}</div>
      <div>project_id : {document.project_id}</div>
      <div>owner_id : {document.owner_id}</div>
      <div>status : {document.status}</div>
      <div>create_date : {document.create_date}</div>
    </div>
  )
}

export default DocumentStatus
