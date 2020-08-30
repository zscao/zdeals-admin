import React, {useState } from 'react'
import { Button, Table, Spinner } from 'react-bootstrap'
import moment from 'moment'

import { Confirm } from '../../shared'

function DealListView(props) {

  const [deleting, setDeleting ] = useState(0);

  const data = (props.deals && Array.isArray(props.deals.data)) ? props.deals.data : []

  function editDeal(deal) {
    if(typeof props.onEditDeal === 'function') props.onEditDeal(deal);
  }

  function deleteDeal(deal) {
    if(typeof props.onDeleteDeal === 'function') {
      setDeleting(deal.id);
      props.onDeleteDeal(deal)
      .finally(() => {
        setDeleting(0);
      });
    }
  }

  return (
    <Table size="sm" hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Store</th>
          <th>Verified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(deal => (<tr key={deal.id}>
          <td>{deal.id}</td>
          <td className="text-overflow" style={{ width: '50%' }}>{deal.title}</td>
          <td>{deal.store && deal.store.name}</td>
          <td>{deal.verifiedTime ? <span>{deal.verifiedBy}<br/>{moment(deal.verifiedTime).format('DD/MM/YYYY h:mm A')}</span> : ''}</td>
          <td>
            <Button size="sm" className="mx-1" variant="primary" onClick={() => editDeal(deal)}>Edit</Button>

            {!deal.deleted && <Confirm
              onConfirm={() => deleteDeal(deal)}
              title="Deleting Deal"
              body="Are you sure you want to delete this deal?">
              <Button size="sm" className="mx-1" variant="danger" disabled={deleting === deal.id} >{ deleting === deal.id ? <Spinner size="sm" animation="grow" /> : 'Delete' }</Button>
            </Confirm>}
          </td>
        </tr>))}
      </tbody>
    </Table>
  )
}


export default DealListView
