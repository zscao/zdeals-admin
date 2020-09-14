import React, { useState, useEffect } from 'react'
import { ListGroup, Form, InputGroup, Row, Col, Button } from 'react-bootstrap'

export default function StoreList({ stores = [], activeStore, onClickItem }) {

  const [filteredStores, setFilteredStores] = useState([])
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (Array.isArray(stores)) {
      const f = filter.trim();
      if (!f) {
        setFilteredStores([...stores]);
      }
      else {
        const regex = new RegExp(`\\b${f}`, 'i');
        const filtered = stores.filter(x => regex.test(x.name));
        setFilteredStores(filtered);
      }
    }
  }, [stores, filter, setFilteredStores])

  return (
    <>
      <Form.Group as={Row}>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Filter:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control value={filter} placeholder="Store name" onChange={e => setFilter(e.target.value)} />
            <InputGroup.Append>
              <Button variant="info" disabled={!filter} onClick={() => setFilter('')}>Clear</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Group>
      <ListGroup className="store-list" variant="flush">
        {filteredStores.map(store => (
          <ListGroup.Item action key={store.id} active={activeStore && activeStore.id === store.id} onClick={() => onClickItem(store)}>
            <div className="d-flex justify-content-between">
              <span className='mr-2 name'>{store.name}</span>
              <span className="domain">{store.domain}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}