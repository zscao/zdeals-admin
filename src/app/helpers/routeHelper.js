// create a jumper based on the history object from react-router

export const createHistoryJumper = history => {
  function jumpTo(next) {
    //console.log('jumpping to: ', next);
    //console.log('history', history);
    if(!next || !history || typeof(history.push) !== 'function') return;
    history.push(next);
  }


  function pathUp(current, level = 1) {
    if(!current) return;
    let index = -1;
    let start = current.length;
    for(let i=0; i<level; i++) {
      index = current.lastIndexOf('/', start);
      if(index <= 0) break;
      start = index - 1;
    }
    if(index > 0) {
      return current.substring(0, index);
    }
    else {
      return null;
    }
  }

  return {
    jumpTo,
    pathUp
  }
}