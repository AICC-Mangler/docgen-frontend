import { useParams } from 'react-router-dom';
import DocumentList from './component/DocumentList';


const DocumentListPage = () => {
  const { project_id } = useParams();


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-green-200/50 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">문서 목록</h1>
          </div>
        </div>
        <div>
          <DocumentList project_id={project_id}/>
        </div>
      </div>
    </div>
  );
};

export default DocumentListPage;
