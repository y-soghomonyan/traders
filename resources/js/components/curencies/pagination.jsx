import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if(page <= 0){
      page = 1
    }
    if(page >= (totalPages + 1)){
      page = currentPage
    }
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {

      if(  (currentPage - i) >= 10 ){
        continue;
      }
      if(  i >= (currentPage + 10)){
        continue;
      }

      items.push(
      
        <li
          key={i}
          className={currentPage === i ? 'active pagination-item' : 'pagination-item' }
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return items;
  };

  return (
    <ul className="pagination market_pagination">

      <li className='pagination-item prev'  onClick={() => handlePageChange(currentPage-1)}>Prev</li>
      {currentPage >= 10 ? ( <li className='pagination-item '> ... </li>) :"" }
      {renderPaginationItems()}
      {currentPage + 10 < totalPages? (<li className='pagination-item '> ... </li>) :"" }
      <li className='pagination-item next' onClick={() => handlePageChange(currentPage+1)}>Next</li>

    </ul>
  );
};

export default Pagination;