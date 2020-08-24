import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

import TreeView from '../shared/treeview'

const testnodes = [
  {
    id: 0,
    title: 'Item 0'
  },
  {
    id: 1,
    title: 'Item 1',
    children: [
      {
        id: 11,
        title: 'Item 11'
      },
      {
        id: 12,
        title: 'Item 12',
        children: [
          {
            id: 121,
            title: 'Item 121'
          },
          {
            id: 122,
            title: 'Item 122'
          },
          {
            id: 123,
            title: 'Item 123'
          },
        ]
      },
      {
        id: 13,
        title: 'Item 13',
        children: [
          {
            id: 131,
            title: 'Item 131'
          },
          {
            id: 132,
            title: 'Item 132'
          },
          {
            id: 133,
            title: 'Item 133'
          },
        ]
      },
      {
        id: 14,
        title: 'Item 14'
      },
    ]
  },
  {
    id: 2,
    title: 'Item 2',
    children: [
      {
        id: 21,
        title: 'Item 21'
      },
      {
        id: 22,
        title: 'Item 22'
      },
      {
        id: 23,
        title: 'Item 23'
      },
      {
        id: 24,
        title: 'Item 24'
      },
    ]
  },
  {
    id: 3,
    title: 'Item 3'
  }
]

export default function Sidebar({ basePath }) {
  return (
    <>
      <Row>
        <Col>
          <Button as={Link} to={`${basePath}/create`}>Create</Button>
        </Col>
      </Row>

      <TreeView data={testnodes} expandLevel={1} />

    </>
  )
}