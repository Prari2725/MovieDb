// import React from 'react';
// import styled from 'styled-components';

// const PageInfo = styled.div`
//   color: #fff;
//   margin: 0 1rem;
//   font-size: 0.9rem;
  
//   @media (max-width: 576px) {
//     width: 100%;
//     text-align: center;
//     margin-bottom: 1rem;
//   }
// `;

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   // Calculate page range to display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
    
//     if (totalPages <= maxPagesToShow) {
//       // If total pages are less than max to show, display all pages
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Always include first page
//       pageNumbers.push(1);
      
//       // Calculate start and end of page range around current page
//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);
      
//       // Adjust if at the beginning or end
//       if (currentPage <= 2) {
//         end = Math.min(totalPages - 1, 4);
//       } else if (currentPage >= totalPages - 1) {
//         start = Math.max(2, totalPages - 3);
//       }
      
//       // Add ellipsis if needed before middle pages
//       if (start > 2) {
//         pageNumbers.push('...');
//       }
      
//       // Add middle pages
//       for (let i = start; i <= end; i++) {
//         pageNumbers.push(i);
//       }
      
//       // Add ellipsis if needed after middle pages
//       if (end < totalPages - 1) {
//         pageNumbers.push('...');
//       }
      
//       // Always include last page
//       pageNumbers.push(totalPages);
//     }
    
//     return pageNumbers;
//   };
  
//   return (
//     <div>
//       <PageInfo>
//         Page {currentPage} of {totalPages}
//       </PageInfo>
      
//       <ul className="pagination">
//         <li className={currentPage === 1 ? 'disabled' : ''}>
//           <a href="#" onClick={(e) => {
//             e.preventDefault();
//             if (currentPage !== 1) onPageChange(1);
//           }}>
//             «
//           </a>
//         </li>
        
//         <li className={currentPage === 1 ? 'disabled' : ''}>
//           <a href="#" onClick={(e) => {
//             e.preventDefault();
//             if (currentPage !== 1) onPageChange(currentPage - 1);
//           }}>
//             ‹
//           </a>
//         </li>
        
//         {getPageNumbers().map((page, index) => (
//           page === '...' ? (
//             <li key={`ellipsis-${index}`} className="disabled">
//               <a href="#" onClick={(e) => e.preventDefault()}>...</a>
//             </li>
//           ) : (
//             <li key={page} className={currentPage === page ? 'active' : ''}>
//               <a href="#" onClick={(e) => {
//                 e.preventDefault();
//                 onPageChange(page);
//               }}>
//                 {page}
//               </a>
//             </li>
//           )
//         ))}
        
//         <li className={currentPage === totalPages ? 'disabled' : ''}>
//           <a href="#" onClick={(e) => {
//             e.preventDefault();
//             if (currentPage !== totalPages) onPageChange(currentPage + 1);
//           }}>
//             ›
//           </a>
//         </li>
        
//         <li className={currentPage === totalPages ? 'disabled' : ''}>
//           <a href="#" onClick={(e) => {
//             e.preventDefault();
//             if (currentPage !== totalPages) onPageChange(totalPages);
//           }}>
//             »
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Pagination;
import React from 'react';
import styled from 'styled-components';

const PageInfo = styled.div`
  color: #fff;
  margin: 0 1rem;
  font-size: 0.9rem;
  
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }

      if (start > 2) pageNumbers.push('...');
      for (let i = start; i <= end; i++) pageNumbers.push(i);
      if (end < totalPages - 1) pageNumbers.push('...');

      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <div>
      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>

      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage !== 1 && onPageChange(1)}
          >
            «
          </button>
        </li>

        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            ‹
          </button>
        </li>

        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <li key={`ellipsis-${index}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={page}
              className={`page-item ${currentPage === page ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
          >
            ›
          </button>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => currentPage !== totalPages && onPageChange(totalPages)}
          >
            »
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
