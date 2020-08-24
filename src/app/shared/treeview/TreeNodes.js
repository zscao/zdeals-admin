
export default function TreeNodes(data = []) {

  let _data = [];

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
    _data = buildNodes(data);
  }

  // private function
  function forEach(list, callback) {
    if(!Array.isArray(list)) return;

    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      callback(node);
      
      if(Array.isArray(node.children)) {
        forEach(node.children, callback);
      }
    }
  }

  function expandOnLevel(level) {
    const nodes = _data;
    forEach(nodes, node => {
      if(node.level <= level) node.open = true;
    })
  }

  function toggleOpenStatus(key) {
    const nodes = _data;
    const node = findNode(nodes, key);
    if (node) {
      node.open = !node.open;

      // set open to false on all children
      if (!node.open && Array.isArray(node.children))
        forEach(node.children, c => c.open = false);
    }
    return node;
  }

  function setActiveItem(key) {
    let selected = undefined;
    
    const nodes = _data;
    
    forEach(nodes, node => {
      if(node.key === key) { 
        node.active = true;
        selected = node;
      }
      else if(node.active)
        node.active = false;
    })

    return selected;
  }

  // build data model
  _data = buildNodes(data);

  return Object.freeze({
    getData: () => _data,
    toggleOpenStatus,
    setActiveItem,
    expandOnLevel,
    resetData,
  })
}

function buildNodes(data) {

  let index = 0;

  function buildSubNodes(list, level = 1) {
    if (!Array.isArray(list)) return undefined;

    return list.map(x => ({
        key: `key-${index++}`,
        title: x.title,
        children: buildSubNodes(x.children, level + 1),
        open: false, //(level <= expandLevel) && Array.isArray(x.children) && x.children.length > 0,
        level: level,
        active: false,
        data: x
      }));
  }

  return buildSubNodes(data);
}

