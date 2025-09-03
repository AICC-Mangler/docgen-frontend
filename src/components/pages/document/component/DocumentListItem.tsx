interface doc_list_item {
  display: string;
  create_date: string;
  status: string;
  onClick: () => void;
  onDelete: ()=> void;
}

const DocumentListItem = ({
  display,
  create_date,
  status,
  onClick,
  onDelete,
}: doc_list_item) => {
  
  return (
    <div
      className="flex h-[7rem] justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div onClick={onClick} className="w-full px-2">
        <div className="text-lg font-bold">{display}</div>
        <div className="text-sm font-light">{create_date}</div>
      </div>
      <div className="remote flex items-center gap-7 px-4">
        {(<div>{status}</div>)}
        {status==="progress"&&(<div className="animate-spin rounded-full h-7 w-7 border-b-2 border-green-500"></div>)}
        <div className="px-2 w-[2rem] flex justify-center">
          {(status==="finished"||status==="error")&&(<button onClick={onDelete}>🗑️</button>)}
        </div>
      </div>
    </div>
  );
};

export default DocumentListItem;
