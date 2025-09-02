import 'handsontable/dist/handsontable.full.css';
import { useParams } from 'react-router-dom';
import FSD_Viewer from './component/FSD_Viewer';


const FunctionalDocumentViewer: React.FC = () => {
  const {document_id} = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <FSD_Viewer document_id={document_id}/>
      </div>
    </div>
  );
};

export default FunctionalDocumentViewer;
