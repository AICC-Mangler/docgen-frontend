import React, { useState } from 'react';
import DocumentQuestion from './component/documentQuestion';
import { api } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthenticationStore } from '../../../stores';

const init_questions: string[] = ['어떤걸 만드실 건가요?'];

const GenerateDocument = () => {
  const [questions, setQuestions] = useState<string[]>(init_questions);
  const [allQnA, setAllQnA] = useState<string[]>([]);
  const [isQuestionEnd, setIsQuestionEnd] = useState<boolean>(false);
  const [isGen, setIsGen] = useState<boolean>(false);
  const { project_id } = useParams();
  const { user } = useAuthenticationStore();
  const memberId = user?.id || 0;
  const navigate = useNavigate();

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
    <div className="w-[30rem] h-[30rem] overflow-y-scroll border-black rounded-md shadow-lg m-auto bg-white">
      {isGen == false && (
        <DocumentQuestion questions={questions} setQnA={submitHandler} />
      )}
    </div>
  );
};

export default GenerateDocument;
