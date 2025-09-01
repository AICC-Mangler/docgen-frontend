import React, { useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import { api } from '../../../api';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/apiClient';
import PRD_Viewer from './component/PRD_Viewer';

const test_url = 'http://localhost:3100/document/requirement/file/68b007e231b920ebbad0910b'


const RequirementDocumentViewer: React.FC = () => {
  const {document_id} = useParams();

  return (
    <div>
      <PRD_Viewer document_id={document_id}/>
    </div>
  );
};

export default RequirementDocumentViewer;
