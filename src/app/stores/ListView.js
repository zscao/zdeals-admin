import React from 'react'
import { Table, Button } from 'react-bootstrap'

export default function ListView({stores = [], onEditStore}) {
  return (
    <Table size="sm" hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Website</th>
          <th>Domain</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stores.map(store => (<tr key={store.id}>
          <td>{store.id}</td>
          <td>{store.name}</td>
          <td>{store.website}</td>
          <td>{store.domain}</td>
          <td>
            <Button variant="primary" size="sm" onClick={() => onEditStore(store)}>Edit</Button>
          </td>
        </tr>))}
      </tbody>
    </Table>
  )
}