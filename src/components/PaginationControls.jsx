import React from 'react'

const PaginationControls = ({currentPage, itemsPerPage,totalItems,onPageChange}) => {

    const totalPage = Math.ceil (totalItems / itemsPerPage);

    const handlePrevious =  () => {
        if(currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNext = () => {
        if(currentPage < totalPage) {
            onPageChange(currentPage + 1);
        }
    }

  return (
    <div className='pagination-controls'>
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>

    {
        Array.from({length: totalPage}, (_,i) => i + 1).map((page)=> (
            <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active": ""}
            >
                {page}
            </button>
        ))
    }

        <button onClick={handleNext} disabled= {currentPage === totalPage}>Next</button>
      
    </div>
  )
}

export default PaginationControls;
