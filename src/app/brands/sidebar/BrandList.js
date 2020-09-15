import React, { useState, useEffect } from 'react'
import { ListGroup, Form, InputGroup, Row, Col, Button } from 'react-bootstrap'

export default function BrandList({brands = [], activeBrand, onClickItem }) {

  const [filteredBrands, setFilteredBrands] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if(Array.isArray(brands)) {
      const f = filter.trim();
      if(!f) {
        setFilteredBrands([...brands]);
      }
      else {
        const regex = new RegExp(`\\b${f}`, 'i');
        const filtered = brands.filter(x => regex.test(x.name));
        setFilteredBrands(filtered);
      }
    }

  }, [brands, filter, setFilteredBrands])

  return (
    <>
      <Form.Group as={Row}>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Filter:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control value={filter} placeholder="Brand name" onChange={e => setFilter(e.target.value)} />
            <InputGroup.Append>
              <Button variant="info" disabled={!filter} onClick={() => setFilter('')}>Clear</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Group>
      <ListGroup className="brand-list" variant="flush">
        {filteredBrands.map(brand => (
          <ListGroup.Item action key={brand.id} active={activeBrand && activeBrand.code === brand.code} onClick={() => onClickItem(brand)}>
            <div className="d-flex justify-content-between">
              <span className='name'>{brand.name}</span>
              <span className="code">{brand.code}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}