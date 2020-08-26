import React from 'react'

export function Pagination(props) {

  function gotoPage(p) {
    if(typeof props.onGotoPage === 'function') props.onGotoPage(p);
  }


  let { pageNumber, pageSize, totalCount } = props;
  if(pageNumber < 1 || pageSize < 1) return null; // invalid properties

  if(!totalCount) totalCount = 0; 
  const prev1 = pageNumber > 1 ? pageNumber - 1 : pageNumber;
  const next1 = pageNumber * pageSize < totalCount ? pageNumber + 1 : pageNumber;

  const prev2 = prev1 > 1 ? prev1 - 1 : prev1;
  const next2 = (next1 + 1) * pageSize < totalCount ? next1 + 1 : next1;

  const prev3 = prev2 > 1 ? prev2 - 1 : prev2;
  const next3 = (next2 + 1) * pageSize < totalCount ? next2 + 1 : next2;

  return (
    <nav aria-label="deals result page" className={props.className}>
      <ul className="pagination">
        <li className={"page-item" + (prev3 < prev1 ? "" : " disabled"  )}><a className="page-link clickable" onClick={() => gotoPage(prev3)}>Prev</a></li>
        {prev1 < pageNumber && <li className="page-item"><a className="page-link clickable" onClick={() => gotoPage(prev1)}>{prev1}</a></li>}
        <li className="page-item active"><a className="page-link">{pageNumber}</a></li>
        {next1 > pageNumber && <li className="page-item"><a className="page-link clickable" onClick={() => gotoPage(next1)}>{next1}</a></li>}
        <li className={"page-item" + (next3 > next1 ? "" : " disabled")}><a className="page-link clickable" onClick={() => gotoPage(next3)}>Next</a></li>
      </ul>
    </nav>
  )
}
