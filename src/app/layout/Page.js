import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { Confirm } from '../shared'

export default function Page(props) {

  const onButtonClick = button => {
    if(typeof(props.onButtonClick) === 'function') props.onButtonClick(button);
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between">
            <h2>{props.title}</h2>
            <div>
              {Array.isArray(props.buttons) && props.buttons.map(b => {
                const onClick = typeof(b.onClick) === 'function' ? b.onClick : (() => onButtonClick(b));
                const variant = b.variant || 'light';

                if(b.confirm) return (
                  <Confirm key={b.name} onConfirm={onClick} title={b.confirm.title} body={b.confirm.body}>
                    <Button className="ml-1" size="sm" variant={variant}>{b.title}</Button>
                  </Confirm>
                );

                return (
                  <Button className="ml-1" size="sm" key={b.name} variant={variant} onClick={onClick}>{b.title}</Button>
                ) 
              })}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  )
}