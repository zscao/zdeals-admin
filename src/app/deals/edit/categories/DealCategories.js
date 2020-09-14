import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { TreeView } from '../../../shared'
import { mapCategoryToTreeNode } from '../../../helpers'

export default function Categories({category, dealCategories, onSubmit}) {

  const treeviewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = category ? mapCategoryToTreeNode([category]) : [];
    treeviewRef.current.setData(data);
  }, [category, treeviewRef])

  useEffect(() => {
    treeviewRef.current.setCheckedItems(dealCategories);
  }, [dealCategories, treeviewRef])

  const onCheckItem = item => {
  }

  const onFormSubmit = () => {
    if(typeof(onSubmit) === 'function') {
      const checked = treeviewRef.current.getCheckedItems() || [];
      const result = onSubmit(checked); 
      if(result instanceof Promise) {
        setLoading(true);
        result.finally(() => setLoading(false));
      }
    }
  }

  return (
    <Row>
      <Col lg={4}>
        <TreeView expandLevel={3} showCheckbox ref={treeviewRef} onCheckItem={onCheckItem} />
      </Col>
      <Col className="d-flex align-items-end flex-column">
        <div className="form-buttons mt-auto">
          <Button type="button" onClick={onFormSubmit}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Col>
    </Row>
  )
}