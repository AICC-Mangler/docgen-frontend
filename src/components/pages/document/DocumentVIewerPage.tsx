import 'handsontable/dist/handsontable.full.css';
import {useSearchParams} from 'react-router-dom';
import DocumentViewer from './component/DocumentViewer';
import type Handsontable from 'handsontable';
import { useProjectStore } from '../../../stores';
import { useEffect} from 'react';


interface document_style {
  display_name : string
  document_type : "requirement" | "functional" | "policy"
  cells : (_row:number, col:number)=>Handsontable.CellMeta
}

const requirement_style :document_style = {
  display_name : '요구사항 정의서',
  document_type : 'requirement',
  cells : (_row, col) => {
    const cellProperties: Handsontable.CellMeta = {};
    if (col < 3) {
      cellProperties.className = 'htCenter htMiddle font-bold';
    }
    if (col < 2) {
      cellProperties.width = 70;
    }
    if (col === 2) {
      cellProperties.width = 140;
    }
    return cellProperties;
  }
}
const functional_style:document_style = {
  display_name : '기능명세서',
  document_type : 'functional',
  cells : (_row, col) => {
    const cellProperties: Handsontable.CellMeta = {};
    if (col < 3) {
      cellProperties.className = 'htCenter htMiddle font-bold';
    }
    if (col < 2) {
      cellProperties.width = 70;
    }

    return cellProperties;
  }
}
const policy_style:document_style = {
  display_name : '정책 정의서',
  document_type : 'policy',
  cells : (_row:number, col:number) => {
    const cellProperties: Handsontable.CellMeta = {};
    if (col < 3) {
      cellProperties.className = 'htCenter htMiddle font-bold';
    }
    if (col > 3 && col < 8) {
      cellProperties.className = 'htCenter htMiddle font-bold';
    }
    if (col < 2) {
      cellProperties.width = 70;
    }
    return cellProperties;
  }
}
interface doc_style_dict{
  [key: string] : document_style
}

const document_style_dict : doc_style_dict = {
  "requirement":requirement_style,
  "functional":functional_style,
  "policy":policy_style
}


const DocumentViewerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  // const { document_id} = useParams();
  const document_id : string = searchParams.get("document_id")||"";
  const docuemnt_type : string = searchParams.get("document_type")||"";
  const doc_style = document_style_dict[docuemnt_type];
  const {currentProject,fetchProjectById} = useProjectStore();
  const project_id : string = searchParams.get("project_id")||"";
  useEffect(()=>{
    if(!project_id) return;
    const loadProject = async()=>{await fetchProjectById(parseInt(project_id,10))}
    loadProject()
  },[]);



  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div>
          {currentProject?.title}
        </div>
        <DocumentViewer 
            display_name={doc_style.display_name}
            document_id={document_id}
            document_type={doc_style.document_type}
            cell_settings={doc_style.cells}
          />
      </div>
    </div>
  );
};

export default DocumentViewerPage;
