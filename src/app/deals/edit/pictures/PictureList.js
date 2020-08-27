import React from 'react'

import { Button, Table } from 'react-bootstrap'
import apiRoutes from '../../../../state/ducks/api/apiRoutes';


export default function List(props) {

  const pictures = props.pictures || [];

  function editPicture(pic) {
    if(typeof(props.onEdit) === 'function') props.onEdit(pic);
  }

  return (
    <Table size="sm" hover>
      <thead>
        <tr>
          <th>Picture</th>
          <th>File Name</th>
          <th>Title</th>
          <th>Default</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pictures.map(pic => (
          <tr key={pic.fileName}>
            <td><img width="40" src={`${apiRoutes.pictures.deals}/${pic.fileName}`} alt={pic.alt} /></td>
            <td>{pic.fileName}</td>
            <td>{pic.title}</td>
            <td>{pic.isDefaultPicture ? 'YES' : ''}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => editPicture(pic)}>Edit</Button>
            </td>
          </tr>))}
      </tbody>
    </Table>
  )
}