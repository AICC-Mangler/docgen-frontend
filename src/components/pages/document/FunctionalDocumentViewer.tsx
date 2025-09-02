import 'handsontable/dist/handsontable.full.css';
import { useParams } from 'react-router-dom';
import FSD_Viewer from './component/FSD_Viewer';


const FunctionalDocumentViewer: React.FC = () => {
  const {document_id} = useParams();

  return (
    <div>
      <FSD_Viewer document_id={document_id}/>
    </div>
  );
};

export default FunctionalDocumentViewer;
