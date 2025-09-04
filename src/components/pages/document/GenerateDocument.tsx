import { useEffect, useState } from 'react';
import DocumentQuestion from './component/documentQuestion';
import { api } from '../../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthenticationStore, useProjectStore } from '../../../stores';

const init_questions: string[] = ['어떤걸 만드실 건가요?'];

const GenerateDocument = () => {
  const [questions, setQuestions] = useState<string[]>(init_questions);
  const [allQnA, setAllQnA] = useState<string[]>([]);
  const [isQuestionEnd, setIsQuestionEnd] = useState<boolean>(false);
  const [isGen, setIsGen] = useState<boolean>(false);
  const { user } = useAuthenticationStore();
  const {currentProject, fetchProjectById} = useProjectStore();
  const memberId = user?.id || 0;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const project_id : string = searchParams.get("project_id")||"";
  useEffect(()=>{
    if(!project_id) return;
    const loadProject = async()=>{await fetchProjectById(parseInt(project_id,10))}
    loadProject()
  },[]);
  // const { project_id } = useParams();

  const submitHandler = async (qna: string[]) => {
    let _new = allQnA;
    _new = _new.concat(qna);
    setAllQnA(_new);
    console.log(_new);
    if (isQuestionEnd == false) {
      const result = await api.post('document/requirement/questions', {
        questions: _new,
      });
      console.log(result);
      setQuestions(result.data.data.questions);
      setIsQuestionEnd(true);
      return;
    }
    setIsGen(true);
    const result = await api.post('/document/requirement/', {
      owner_id: `${memberId}`,
      project_id: project_id,
      requirement: _new.join('\n'),
    });
    console.log(result);
    navigate(`/documents/project/${project_id}`);
  };

  return (
    <div className="m-auto w-[50rem] p-8 overflow-y-auto bg-white rounded-2xl shadow-sm border border-green-200/50">
      <div>
        <div className='text-gray-800'>{currentProject?.title}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">요구사항 정의서 생성</h1>
      </div>
      {isGen == false && (
        <DocumentQuestion questions={questions} setQnA={submitHandler} />
      )}
    </div>
  );
};

export default GenerateDocument;
