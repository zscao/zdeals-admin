import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

      // <ZPage title="Create Deal" buttons={buttons} onButtonClick={this.onButtonClick}>
      //   <Row>
      //     <Col sm={12} className="grid-margin stretch-card">
      //       <ZCard title="Deal Details" className="deal-details">
      //         <DealFrom onSubmit={this.submitForm} onCheckExistence={this.checkExistence} />
      //       </ZCard>
      //     </Col>
      //   </Row>
      // </ZPage>
    )
  }
}

const mapStateToProps = state => ({
  deals: state.deals.search
})

const mapDispatchToProps = {
  ...dealActions
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateDeal));