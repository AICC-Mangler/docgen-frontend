import 'handsontable/dist/handsontable.full.css';
import { useParams } from 'react-router-dom';
import DocumentViewer from './component/DocumentViewer';
import type Handsontable from 'handsontable';

const FunctionalDocumentViewer: React.FC = () => {
  const { document_id } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
      <DocumentViewer
          display_name='기능 명세서'
          document_id={document_id}
          document_type="functional"
          cell_settings={(_row, col) => {
            const cellProperties: Handsontable.CellMeta = {};
            if (col < 3) {
              cellProperties.className = 'htCenter htMiddle font-bold';
            }
            if (col < 2) {
              cellProperties.width = 70;
            }

            return cellProperties;
          }}
        />
      </div>
    </div>
  );
};

export default FunctionalDocumentViewer;
