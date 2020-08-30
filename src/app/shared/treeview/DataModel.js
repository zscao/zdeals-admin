import Listeners from './EventListeners'
import TreeNodes from './TreeNodes'

const EventNames = {
  SelectItem: 'selectItem',
  ToggleOpen: 'toggleOpen',
  ToggleCheck: 'toggleCheck',
}


export default function DataModel(data = [], expandLevel = 0) {
  
  const _listeners = new Listeners();
  
  const _nodes = new TreeNodes(data);
  // set default expand nodes based on the expandLevel
  _nodes.expandOnLevel(expandLevel);

  function selectItem(key) {
    //console.log(`select item: `, key);

    const selected = _nodes.setActiveItem(key);
    if(selected) {
      const listners = _listeners.searchEventListeners(EventNames.SelectItem);
      if(listners.length > 0) {
        listners.forEach(f => f.callback(selected));
      }
    }

    return selected;
  }

  function toggleOpenStatus(key) {

    const toggled = _nodes.toggleOpenStatus(key);

    if(toggled) {
      const listners = _listeners.searchEventListeners(EventNames.ToggleOpen);
      if(listners.length > 0) {
        listners.forEach(f => f.callback(toggled));
      }
    }
    return toggled;
  }

  function toggleCheckStatus(key) {
    const toggled = _nodes.toggleCheckStatus(key);
    if(toggled) {
      const listners = _listeners.searchEventListeners(EventNames.ToggleCheck);
      if(listners.length > 0) {
        listners.forEach(f => f.callback(toggled));
      }
    }
    return toggled;
  }

  function resetData(data) {
    _nodes.resetData(data);
    _nodes.expandOnLevel(expandLevel);
  }

  function getData() {
    return _nodes.getData();
  }

  function getCheckedItems() {
    return _nodes.getCheckedItems();
  }

  function setCheckedItems(items) {
    return _nodes.setCheckedItems(items);
  }

  function addEventListener(event, callback) {
    if(typeof(event) !== 'string' || typeof(callback) !== 'function') throw new Error("Invalid parameters");

    var names = Object.values(EventNames);
    if(names.indexOf(event) < 0) {
      console.log('Not supported event: ' + event);
      return;
    }

    _listeners.addEventListener(event, callback);
  }

  function removeEventListener(event, callback) {
    _listeners.removeEventListener(event, callback);
  }

  function removeEventListeners(event) {
    _listeners.removeEventListeners(event);
  }


  return Object.freeze({
    getData,
    resetData,
    selectItem,
    toggleOpenStatus,
    toggleCheckStatus,
    getCheckedItems,
    setCheckedItems,
    addEventListener,
    removeEventListener,
    removeEventListeners
  })
}
