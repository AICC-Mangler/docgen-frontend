import React, { useEffect, useState } from 'react';

type Document_question_type = {
  questions: string[];
  setQnA: (qna: string[]) => void;
};

const DocumentQuestion: React.FC<Document_question_type> = ({
  questions,
  setQnA,
}: Document_question_type) => {
  const [answer, setAnswer] = useState<string[]>(['']);

  useEffect(() => {
    const initArray: string[] = [];
    questions?.forEach(() => initArray.push(''));
    setAnswer(initArray);
  }, []);

  const changeAnswer = (idx: number) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const _new = answer;
      _new[idx] = e.target.value;
      setAnswer(_new);
    };
  };

  const submitHandler = () => {
    const qna = questions?.map(
      (question, idx) => `${question} : ${answer[idx] || ''}`,
    );
    setQnA(qna);
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-between">
      <div className="p-2 overflow-y-auto flex flex-col gap-4">
        {questions?.map((question, idx) => (
          <div key={question + idx} className="w-full flex flex-col gap-3">
            <div className="w-full px-3">{question}</div>
            <textarea
              className="w-full p-3 resize-none"
              rows={4}
              name=""
              id=""
              placeholder={question}
              onChange={changeAnswer(idx)}
            ></textarea>
          </div>
        ))}
      </div>
      <button onClick={submitHandler}>다음</button>
    </div>
  );
};

export default DocumentQuestion;
