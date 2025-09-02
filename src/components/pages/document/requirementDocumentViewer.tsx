import 'handsontable/dist/handsontable.full.css';
import { useParams } from 'react-router-dom';
import PRD_Viewer from './component/PRD_Viewer';


const RequirementDocumentViewer: React.FC = () => {
  const {document_id} = useParams();

  return (
    <div>
      <PRD_Viewer document_id={document_id}/>
    </div>
  );
};

export default RequirementDocumentViewer;
