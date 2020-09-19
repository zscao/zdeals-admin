import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

import Page from '../../layout/Page'

import CreateFrom from './CreateForm';
import { createHistoryJumper } from '../../helpers/routeHelper';

import * as dealActions from '../../../state/ducks/deals/actions';
import * as dealRequest from '../../../state/ducks/deals/request';

const buttons = [
  { name: "backToList", title: 'Back to List' }
]


class CreateDeal extends React.Component {

  jumper = createHistoryJumper(this.props.history);

  submitForm = values => {
    const query = this.props.deals.query;
    if(query && query.category) {
      values = {
        ...values,
        category: query.category
      }
    }

    this.props.createDeal(values).then(response => {
      const next = `/deals/edit/${response.id}`;
      this.jumper.jumpTo(next);
    })
  }

  onButtonClick = button => {
    if (button.name === 'backToList') {
      const list = '/deals/list';
      this.jumper.jumpTo(list);
      // const path = this.props.location.pathname;
      // if (path) {
      //   const up = this.jumper.pathUp(path);
      //   if (up) this.jumper.jumpTo(up);
      // }
    }
  }

  checkExistence = url => {
    return dealRequest.checkExistenceBySource(url);
  }

  render() {

    return (
      <Page title="Create Deal" buttons={buttons} onButtonClick={this.onButtonClick}>
        <Card>
          <Card.Body>
            <CreateFrom onSubmit={this.submitForm} onCheckExistence={this.checkExistence} />
          </Card.Body>
        </Card>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  deals: state.deals.search
})

const mapDispatchToProps = {
  ...dealActions
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeal);