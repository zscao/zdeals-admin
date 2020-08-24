import Listeners from './EventListeners'
import TreeNodes from './TreeNodes'

const EventNames = {
  SelectItem: 'selectItem',
  ToggleOpen: 'toggleOpen',
}


export default function DataModel(data = [], expandLevel = 0) {
  
  const _listeners = new Listeners();
  
  const _nodes = new TreeNodes(data);
  // set default expand nodes based on the expandLevel
  _nodes.expandOnLevel(expandLevel);

  function selectItem(key) {
    console.log(`select item: `, key);

    const selected = _nodes.setActiveItem(key);
    if(selected) {
      const listners = _listeners.searchEventListeners(EventNames.SelectItem);
      if(listners.length > 0) {
        listners.forEach(f => f.callback(selected));
      }
    }
  }

  function toggleOpenStatus(key) {
    console.log('toggle open: ', key);
    const toggled = _nodes.toggleOpenStatus(key);
    console.log('toggled: ', toggled);
    if(toggled) {
      const listners = _listeners.searchEventListeners(EventNames.ToggleOpen);
      if(listners.length > 0) {
        listners.forEach(f => f.callback(toggled));
      }
    }
  }

  function addEventListener(event, callback) {
    if(typeof(event) !== 'string' || typeof(callback) !== 'function') throw "Invalid parameters";

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
    data: _nodes.data,
    selectItem,
    toggleOpenStatus,
    addEventListener,
    removeEventListener,
    removeEventListeners
  })
}
