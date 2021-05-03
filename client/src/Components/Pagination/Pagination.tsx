import React, {useEffect, useState} from 'react';
import './Pages.Style.css'

interface PagesProps {
    pagesList: any[],
    changePage : (arg : string) => void
  }


const Pagination : React.FC <PagesProps> = ({pagesList, changePage}) =>{
    let tempArray = new Array();
    const [pageNumbers, setPageNumbers] = useState(tempArray);
    const [selectedPageNum, setPage] =  useState(1)

  useEffect(() =>{
    if (pagesList.length > 0 )
    setPageNumbers(pagesList)
  },[pagesList])

  const selectPage = (number: any, indx : any) =>{
    setPage(indx)
    changePage(number)
  }

    return(
        <div>
            {
                pageNumbers.length > 0 ? 
                <div className="numbers">
                {   pagesList.map((val, indx) =>{
                    return(
                    <div key={indx} className="alignPages" onClick={()=>selectPage(val,indx)}>
                    <div className={selectedPageNum === val ? "selectedPagination" : "pagination"}>{val}</div>
                    </div>
                    )
                })  
                }
                </div>
                :
                <div></div>
            }
           
        </div>
    )
}

export default Pagination;