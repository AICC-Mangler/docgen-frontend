import React from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentStatus from './documentStatus';

type document_info = {
  id: string;
  project_id: string;
  owner_id: string;
  status: string;
  create_date: string;
};

const RequirementDocumentList = ({
  documentList,
}: {
  documentList: document_info[];
}) => {
  const navigate = useNavigate();

  const documentViewHandler = (document_id: string) => {
    navigate(`/prd-viewer-test/${document_id}`);
  };
  return (
    <div>
      {documentList?.map((item: document_info) => (
        <div key={item.id} className="flex p-3 border">
          <DocumentStatus document={item} />
          <button
            className="border-black"
            onClick={() => documentViewHandler(item.id)}
          >
            view
          </button>
        </div>
      ))}
    </div>
  );
};

export default RequirementDocumentList;
