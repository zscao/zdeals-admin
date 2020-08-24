
export default function TreeNodes(data = []) {

  console.log('building tree nodes with: ', data);

  let index = 0;
  let _nodes = buildNodes(data);

  // private function
  function buildNodes(list, level = 1) {
    if (!Array.isArray(list)) return undefined;

    return list.map(x => ({
        key: `key-${index++}`,
        title: x.title,
        children: buildNodes(x.children, level + 1),
        open: false, //(level <= expandLevel) && Array.isArray(x.children) && x.children.length > 0,
        level: level,
        active: false,
        data: x
      }));
  }

  function findNode(list, key) {
    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      if(node.key === key) return node;
      
      if(Array.isArray(node.children)) {
        const result = findNode(node.children, key);
        if(result) return result;
      }
    }
    return undefined;
  }

  function resetData(data = []) {
    _nodes = buildNodes(data);
  }

  // private function
  function forEachCall(list, callback) {
    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      callback(node);
      
      if(Array.isArray(node.children)) {
        forEachCall(node.children, callback);
      }
    }
  }

  // function forEach(callback) {
  //   if(typeof(callback) !== 'function') throw 'Invalid callback function';

  //   forEachCall(_nodes, callback)
  // }

  function expandOnLevel(level) {
    forEachCall(_nodes, node => {
      if(node.level <= level) node.open = true;
    })
  }

  function toggleOpenStatus(key) {
    const node = findNode(_nodes, key);
    if (node) {
      node.open = !node.open;

      // set open to false on all children
      if (!node.open && Array.isArray(node.children))
        forEachCall(node.children, c => c.open = false);
    }
    return node;
  }

  function setActiveItem(key) {
    let selected = undefined;
    forEachCall(_nodes, node => {
      if(node.key === key) { 
        node.active = true;
        selected = node;
      }
      else if(node.active)
        node.active = false;
    })

    return selected;
  }

  return Object.freeze({
    // forEach,
    data: _nodes,
    toggleOpenStatus,
    setActiveItem,
    expandOnLevel,
    resetData,
  })
}

