
export default function TreeNodes(data = []) {

  let _data = [];

  function findNode(list, key) {
    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      if (node.key === key) return node;

      if (Array.isArray(node.children)) {
        const result = findNode(node.children, key);
        if (result) return result;
      }
    }
    return undefined;
  }

  function resetData(data = []) {
    _data = buildNodes(data);
  }

  // private function
  function forEach(list, callback) {
    if (!Array.isArray(list)) return;

    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      callback(node);

      if (Array.isArray(node.children)) {
        forEach(node.children, callback);
      }
    }
  }

  function expandOnLevel(level) {
    forEach(_data, node => {
      if (node.level <= level) node.open = true;
    })
  }

  function toggleOpenStatus(key) {
    const node = findNode(_data, key);
    if (node) {
      node.open = !node.open;

      // set open to false on all children
      if (!node.open && Array.isArray(node.children))
        forEach(node.children, c => c.open = false);
    }
    return node;
  }

  function setOpenStatus(node) {
    if(!node) return;
    node.open = true;
    if(node.parent) setOpenStatus(node.parent);
  }

  function toggleCheckStatus(key) {
    const node = findNode(_data, key);
    if (node) {
      const status = !node.checked;
      setCheckStatus(node, status);
    }
    return node;
  }


  function setCheckStatus(node, status) {
    if (!node) return;

    node.checked = status;
    // set parent
    if (node.parent) setParentCheckStatus(node.parent, status);
    // set check status to all children
    if (Array.isArray(node.children)) setChildrenCheckStatus(node.children, status);

    return node;
  }


  // set parent check status:
  // if all children are checked, then set the parent to checked status; otherwise set to unchecked status.
  function setParentCheckStatus(node, status) {
    if (!node) return;

    if (status) { // checked
      if (Array.isArray(node.children) && node.children.every(x => x.checked)) {
        node.checked = status;
        if (node.parent) setParentCheckStatus(node.parent, status);
      }
    }
    else {
      node.checked = status;
      if (node.parent) setParentCheckStatus(node.parent, status);
      // check if any other children is still checked
      // if(node.children.some(x => x.checked) === false) {
      //   node.checked = status;
      //   if(node.parent) setParentCheckStatus(node.parent, status);
      // }
    }
  }

  // private function
  function setChildrenCheckStatus(list, status) {
    if (!Array.isArray(list)) return;
    list.forEach(node => {
      node.checked = status;
      if (Array.isArray(node.children)) setChildrenCheckStatus(node.children, status);
    })
  }

  function setActiveItemByKey(key) {
    let selected = undefined;

    forEach(_data, node => {
      if (node.key === key) {
        node.active = true;
        selected = node;
      }
      else if (node.active)
        node.active = false;
    })

    if(selected) setOpenStatus(selected);
    return selected;
  }

  function setActiveItemByData(data) {
    let selected = undefined;

    forEach(_data, node => {
      if(node.data === data) {
        node.active = true;
        selected = node;
      }
      else if(node.active) {
        node.active = false;
      }
    })

    if(selected) setOpenStatus(selected);
    return selected;
  }

  function getCheckedItems() {
    const checked = [];
    forEach(_data, node => {
      if (node.checked) checked.push(node);
    })
    return checked;
  }

  function setCheckedItems(items) {

    // clear checked status
    forEach(_data, node => node.checked = false);

    if(Array.isArray(items)) {
      forEach(_data, node => {
        if(items.some(x => x.id === node.data.id)) setCheckStatus(node, true);
      })
    }
    
    return getCheckedItems();
  }

  // build data model
  _data = buildNodes(data);

  return Object.freeze({
    getData: () => _data,
    toggleOpenStatus,
    toggleCheckStatus,
    setActiveItemByKey,
    setActiveItemByData,
    expandOnLevel,
    resetData,
    getCheckedItems,
    setCheckedItems,
  })
}

function buildNodes(data) {

  let index = 0;

  function buildSubNodes(list, level = 1, parent = undefined) {
    if (!Array.isArray(list)) return undefined;

    return list.map(x => {
      const node = {
        key: `key-${index++}`,
        title: x.title,
        parent,
        open: false,
        level: level,
        active: false,
        checked: false,
        data: x
      };

      if (Array.isArray(x.children))
        node.children = buildSubNodes(x.children, level + 1, node);

      return node;
    });
  }

  return buildSubNodes(data);
}

