import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

import moment from 'moment'

function DealVisitBar({data}) {

  const [ chartData, setChartData ] = useState(null);

  useEffect(() => {
    setChartData(mapToChartData(data));
  }, [data])

  return chartData 
    ? <Bar data={chartData} options={{maintainAspectRatio: false}} />
    : null;
}

function mapToChartData(data) {
  if(!data || !Array.isArray(data.details)) return null;

  return {
    labels: data.details.map(x => moment(x.date).format('YYYY-MM-DD')),
    datasets: [
      {
        label: `${data.statisMode} Visit`,
        data: data.details.map(x => x.count),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      }
    ] 
  }
}


export default DealVisitBar;