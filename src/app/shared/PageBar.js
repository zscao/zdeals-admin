import React from 'react'
import { Pagination } from 'react-bootstrap'

export function PageBar({pageNumber, pageSize, totalCount, onGotoPage}) {

  function gotoPage(p) {
    if(typeof onGotoPage === 'function') onGotoPage(p);
  }

  if(pageNumber < 1 || pageSize < 1) return null; // invalid properties
  if(!totalCount) totalCount = 0; 

  // don't show the page bar is there is only one page
  if(totalCount <= pageSize) return null;

  const prev1 = pageNumber > 1 ? pageNumber - 1 : pageNumber;
  const next1 = pageNumber * pageSize < totalCount ? pageNumber + 1 : pageNumber;

  const prev2 = prev1 > 1 ? prev1 - 1 : prev1;
  const next2 = (next1 + 1) * pageSize < totalCount ? next1 + 1 : next1;

  const prev3 = prev2 > 1 ? prev2 - 1 : prev2;
  const next3 = (next2 + 1) * pageSize < totalCount ? next2 + 1 : next2;


  return (
    <Pagination>
      <Pagination.Prev disabled={prev3 >= prev1} onClick={() => gotoPage(prev3)}></Pagination.Prev>
      {prev1 < pageNumber && <Pagination.Item onClick={() => gotoPage(prev1)}>{prev1}</Pagination.Item>}
      <Pagination.Item active>{pageNumber}</Pagination.Item>
      {next1 > pageNumber && <Pagination.Item onClick={() => gotoPage(next1)}>{next1}</Pagination.Item>}
      <Pagination.Next disabled={next3 <= next1} onClick={() => gotoPage(next3)}></Pagination.Next>
    </Pagination>
  )
}
