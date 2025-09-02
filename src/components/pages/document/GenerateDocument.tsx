import React, { useEffect, useState } from 'react'
import DocumentQuestion from './component/documentQuestion';
import { api } from '../../../api';
import { useParams } from 'react-router-dom';

const init_questions : string[] = ["어떤걸 만드실 건가요?"]

const GenerateDocument = () => {
  const [questions, setQuestions] = useState<string[]>(init_questions);
  const [allQnA, setAllQnA] = useState<string[]>([])
  const [isQuestionEnd, setIsQuestionEnd] = useState<boolean>(false)
  const [isGen,setIsGen] = useState<boolean>(false);
  const {project_id} = useParams();

  const submitHandler = async (qna:string[])=>{
    let _new = allQnA;
    _new = _new.concat(qna);
    setAllQnA(_new);
    console.log(_new)
    if(isQuestionEnd == false){
      const result = await api.post("document/requirement/questions",{
        questions: _new
      })
      console.log(result)
      setQuestions(result.data.data.questions);
      setIsQuestionEnd(true);
      return;
    }
    setIsGen(true);
    const result = await api.post("/document/requirement/", {
      owner_id : "backend1",
      project_id : project_id,
      requirement : _new.join("\n")
    })
    console.log(result);
  }

  return (
    <div className='w-[30rem] h-[30rem] overflow-y-scroll border-black border'>
      {
        isGen==false&&(<DocumentQuestion questions={questions} setQnA={submitHandler}/>)
      }
    </div>
  )
}

export default GenerateDocument
