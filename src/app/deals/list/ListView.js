import React, {useState } from 'react'
import { Button, Table, Spinner } from 'react-bootstrap'

import { Confirm, Constants } from '../../shared'

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
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(deal => (<tr key={deal.id}>
          <td>{deal.id}</td>
          <td className="text-overflow" style={{ width: '50%' }}>{deal.title}</td>
          <td>{deal.store && deal.store.name}</td>
          <td><span className={getTextClassForStatus(deal.status)}>{deal.status}</span></td>
          <td>
            <Button size="sm" className="mx-1" variant="primary" onClick={() => editDeal(deal)}>Edit</Button>

            {deal.status !== 'deleted' && <Confirm
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

function getTextClassForStatus(status) {
  switch(status) {
    case Constants.DealStatus.Deleted: return 'text-danger';
    case Constants.DealStatus.Verified: return 'text-success';
    case Constants.DealStatus.Created: return 'text-info';
    default: return 'text-dark';
  }
}


export default DealListView
