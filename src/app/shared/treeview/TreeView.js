import React from 'react'
import { Form, ListGroup, Collapse, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown, faMinus, faFolder, faFolderOpen, faFile } from '@fortawesome/free-solid-svg-icons'

import './treeview.scss'

import DataModel from './DataModel'

export class TreeView extends React.Component {
  
  constructor(props) {
    super(props);
    this.model = new DataModel(props.data, props.expandLevel);
  }

  componentDidMount() {
    
    this.model.addEventListener('selectItem', item => {
      //console.log('item selected in model1: ', item);
      this.forceUpdate();
    })
    this.model.addEventListener('toggleOpen', item => {
      //console.log('open status changed: ', item);
      this.forceUpdate();
    })
    this.model.addEventListener('toggleCheck', item => {
      this.forceUpdate();
    })
  }

  componentDidUpdate(prevProps) {

    const prevData = prevProps.data;
    const currData = this.props.data;

    if(!(prevData || currData)) return;

    if((!prevData && currData) || (prevData && !currData) || (prevData.length !== currData.length)) {
      this.model.resetData(currData);
      this.forceUpdate();
    }
  }

    // public functions
    getCheckedItems = () => {
      const checked = this.model.getCheckedItems();
      if(!Array.isArray(checked)) return null;
  
      return checked.map(x => x.data);
    }
  
    setCheckedItems = items => {
      const checked = this.model.setCheckedItems(items);
      if(!Array.isArray(checked)) return null;
      this.forceUpdate();
    }
  
    setData = data => {
      this.model.resetData(data);
      this.forceUpdate();
    }

    // end public functions

  selectItem = item => {
    const selected = this.model.selectItem(item.key);
    if(selected && typeof(this.props.onSelectItem) === 'function') {
      const result = this.props.onSelectItem(selected.data);
      if(result instanceof Promise) {
        item.loading = true;
        this.forceUpdate();
        result.finally(() => {
          item.loading = false;
          this.forceUpdate();
        })
      }
    }
  }

  toggleCheckStatus = item => {
    const toggled = this.model.toggleCheckStatus(item.key);
    if(toggled && typeof(this.props.onCheckItem) === 'function') {
      this.props.onCheckItem(toggled.data);
    }
  }

  toggleOpenStatus = item => {
    this.model.toggleOpenStatus(item.key);
  }

  renderListGroup = items => {
    if (!Array.isArray(items)) return null;

    const { selectRow, showCheckbox, showIcon } = this.props;

    return (
      <ListGroup className="list-group-root">
        {items.map(item => {        

          return item.children
          ? (
            <React.Fragment key={item.key}>
              <ListGroup.Item className={selectRow ? 'select-row' : ''}  active={item.active}>
                <FontAwesomeIcon icon={item.open ? faAngleDown : faAngleRight} className="expander" onClick={() => this.toggleOpenStatus(item)} />
                { item.loading
                  ? <Spinner animation="grow" size="sm" />
                  : showIcon && <FontAwesomeIcon icon={item.open ? faFolderOpen : faFolder} className="folder" />
                }
                { showCheckbox && <Form.Check type="checkbox" aria-label="" checked={item.checked} onChange={e => this.toggleCheckStatus(item)} />} 
                <span onClick={() => this.selectItem(item)}>{item.title}</span>
              </ListGroup.Item>
              <Collapse in={item.open}>
                {this.renderListGroup(item.children)}
              </Collapse>
            </React.Fragment>
          ) : (
            <ListGroup.Item className={selectRow ? 'select-row' : ''} key={item.key} active={item.active}>
              <FontAwesomeIcon icon={faMinus} className="placeholder" />
              { showIcon && <FontAwesomeIcon icon={faFile} className="file" />} 
              { showCheckbox && <Form.Check type="checkbox" aria-label="" checked={item.checked} onChange={e => this.toggleCheckStatus(item)} />}
              <span onClick={() => this.selectItem(item)}>{item.title}</span>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    )
  }

  render() {
    const data = this.model.getData();
    //console.log('Data: ', data);

    return this.renderListGroup(data);
  }
}