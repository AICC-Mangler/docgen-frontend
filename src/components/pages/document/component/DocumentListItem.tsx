import { useState } from "react";
import Modal from "../../../common/Modal";

interface doc_list_item {
  display: string;
  create_date: string;
  status: string;
  creatable : boolean,
  onClick: () => void;
  onDelete: ()=> void;
}


interface emoji_dict{
  [key:string]:{emoji:string, text: string}
} 
const document_status_emoji : emoji_dict= {
  "none" : {emoji : "✏️",text : "생성"},
  "progress" : {emoji:"💬",text : "생성중"},
  "finished" : {emoji:"📄", text:"뷰어"},
  "error" : {emoji:"🚫", text:"오류"}
}

const DocumentListItem = ({
  display,
  create_date,
  status,
  creatable,
  onClick,
  onDelete,
}: doc_list_item) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen]= useState<boolean>(false);
  const deleteHandler = ()=>{
    setIsDeleteModalOpen(true);
  }
  const handleProjectDelete = ()=>{
    onDelete();
    setIsDeleteModalOpen(false);
  }
  return (
    <div
      className="flex h-[7rem] justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="w-full px-2">
        <div className="text-lg font-bold">{display}</div>
        <div className="text-sm font-light">{create_date}</div>
      </div>
      <div className="remote flex items-center gap-7 px-4">
        {
          (status==="none" && creatable === false)
          ?(<button className={`bg-gray-200 border-neutral-300 text-gray-800 w-[6rem] h-[5rem]`} onClick={onClick}>
              <div>🚧</div>
              <div className="text-xs">{"이전 단계 필요"}</div>
            </button>)
          :(<button className={`bg-white border-neutral-300 text-gray-800 w-[6rem] h-[5rem]`} onClick={onClick}>
              <div>{document_status_emoji[status].emoji}</div>
              <div className="text-sm">{document_status_emoji[status].text}</div>
            </button>)
        }
        
        <div className="px-2 w-[2rem] h-[5rem] flex justify-center items-center">
          {(status==="finished"||status==="error")&&(<button onClick={deleteHandler} className="bg-white border border-neutral-300 h-full">🗑️</button>)}
          {status==="progress"&&(<div className="animate-spin rounded-full h-7 w-7 border-b-2 border-green-500"></div>)}
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        title="문서 삭제"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              문서를 삭제하시겠습니까?
            </p>
            <p className="text-sm text-gray-500">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
              }}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleProjectDelete}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentListItem;
