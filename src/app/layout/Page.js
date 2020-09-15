import React from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'

import { Confirm } from '../shared'

export default function Page({title, titleBadge, buttons = [], onButtonClick, loading, children}) {

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between">
            <h2>{title} {titleBadge}</h2>
            <div>
              {buttons.map(b => {
                const onClick = typeof(b.onClick) === 'function' ? b.onClick : (() => onButtonClick(b));
                const variant = b.variant || 'info';

                if(b.confirm) return (
                  <Confirm key={b.name} onConfirm={onClick} title={b.confirm.title} body={b.confirm.body}>
                    <Button className="ml-1 min100" size="sm" variant={variant} disabled={!!loading}>
                      {b.name === loading ? <Spinner animation="grow" size="sm" /> : b.title}
                    </Button>
                  </Confirm>
                );

                return (
                  <Button className="ml-1" size="sm" key={b.name} variant={variant} disabled={!!loading} onClick={onClick}>
                    {b.name === loading ? <Spinner animation="grow" size="sm" /> : b.title}
                  </Button>
                ) 
              })}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  )
}