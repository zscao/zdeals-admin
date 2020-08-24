
export default function EventListeners() {
  let _listeners = [];

  function addEventListener(eventName, callback) {

    if(typeof(eventName) !== 'string' || typeof(callback) !== 'function') return;

    _listeners.push({
      eventName,
      callback
    })
  }

  function removeEventListener(eventName, callback) {
    _listeners = _listeners.filter(x => x.eventName !== eventName || x.callback !== callback);
  }

  function removeEventListeners(eventName) {
    _listeners = _listeners.filter(x => x.eventName !== eventName);
  }

  function searchEventListeners(eventName) {
    return _listeners.filter(x => x.eventName === eventName);
  }

  return Object.freeze({
    addEventListener,
    removeEventListener,
    removeEventListeners,
    searchEventListeners
  })
}