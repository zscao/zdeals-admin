import React from 'react'
import { connect } from 'react-redux'

import DealVisitBar from './DealVisitBar'

import * as dashboardActions from '../../state/ducks/dashboard/actions'

class Dashboard extends React.Component {

  componentDidMount() {
    const {dealsDailyVisit} = this.props;

    if(!dealsDailyVisit) this.props.getDealsDailyVisit();
  }

  render() {

    const {dealsDailyVisit} = this.props;

    console.log('daily visit: ', dealsDailyVisit);

    return (
      <div className="chart-container">
        <DealVisitBar data={dealsDailyVisit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dealsDailyVisit: state.dashboard.dealsDailyVisit.result
})

const mapDispatchToProps = {
  ...dashboardActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
