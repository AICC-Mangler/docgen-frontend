
interface doc_list_item {
  display:string,
  create_date:string,
  status:string,
  onClick:()=>void,
}

const DocumentListItem = ({display, create_date, status, onClick}: doc_list_item) => {
  const btn_display = ()=>{
    if(status === "none"){
      return "생성"
    }
    if(status === "finished"){
      return "뷰어"
    }
    return "생성";
  }

  return (
    <div onClick={onClick} className="flex h-[7rem] justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <div className='w-[15rem] px-2'>
        <div className='text-lg font-bold'>{display}</div>
        <div className='text-sm font-light'>{create_date}</div>
      </div>
      <div className="remote flex items-center gap-2">
        <div>{status}</div>
      </div>
    </div>
  )
}

export default DocumentListItem
