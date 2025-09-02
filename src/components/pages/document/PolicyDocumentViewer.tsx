import 'handsontable/dist/handsontable.full.css';
import { useParams } from 'react-router-dom';
import SPD_Viewer from './component/SPD_Viewer';


const PolicyDocumentViewer: React.FC = () => {
  const {document_id} = useParams();

  return (
    <div>
      <SPD_Viewer document_id={document_id}/>
    </div>
  );
};

export default PolicyDocumentViewer;
