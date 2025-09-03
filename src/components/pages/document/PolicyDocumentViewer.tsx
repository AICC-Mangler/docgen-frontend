import 'handsontable/dist/handsontable.full.css';
import { useParams } from 'react-router-dom';
import SPD_Viewer from './component/SPD_Viewer';

const PolicyDocumentViewer: React.FC = () => {
  const { document_id } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <SPD_Viewer document_id={document_id} />
      </div>
    </div>
  );
};

export default PolicyDocumentViewer;
