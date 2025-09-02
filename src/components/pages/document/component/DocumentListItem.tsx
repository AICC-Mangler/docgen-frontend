
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
    <div className='flex justify-between w-full gap-2 items-center border-black bottom-1'>
      <div className='w-[15rem] px-2'>
        <div className='text-lg font-bold'>{display}</div>
        <div className='text-sm font-light'>{create_date}</div>
      </div>
      <div>{status}</div>
      <button onClick={onClick} className='w-[5rem]'>{btn_display()}</button>
    </div>
  )
}

export default DocumentListItem
