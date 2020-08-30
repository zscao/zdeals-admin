import React, { useEffect, useRef } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { TreeView } from '../../../shared'
import { mapCategoryToTreeNode } from '../../../helpers'

export default function Categories({category, dealCategories, onSubmit}) {

  const treeviewRef = useRef(null);

  useEffect(() => {
    console.log('set category: ', category);
    const data = category ? mapCategoryToTreeNode([category]) : [];
    treeviewRef.current.setData(data);
    //treeviewRef.current.setCheckedItems(dealCategories);
  }, [category, treeviewRef])

  useEffect(() => {
    console.log('set deal categories: ', dealCategories);
    treeviewRef.current.setCheckedItems(dealCategories);
  }, [dealCategories, treeviewRef])

  const onCheckItem = item => {
    //console.log('item checked: ', item);
  }

  const onFormSubmit = () => {
    if(typeof(onSubmit) === 'function') {
      const checked = treeviewRef.current.getCheckedItems() || [];
      onSubmit(checked); 
    }
  }

  return (
    <Row>
      <Col lg={4}>
        <TreeView expandLevel={3} showCheckbox ref={treeviewRef} onCheckItem={onCheckItem} />
      </Col>
      <Col className="d-flex align-items-end flex-column">
        <div className="form-buttons mt-auto">
          <Button type="button" onClick={onFormSubmit}>Submit</Button>
        </div>
      </Col>
    </Row>
  )
}