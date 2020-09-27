import React, { useEffect } from 'react'
import { createHistoryJumper } from '../../helpers'

import * as accountActions from '../../../state/ducks/account/actions'

export default function Logout({history}) {

  useEffect(() => {
    accountActions.logout()
    .then(() => {
      const jumper = createHistoryJumper(history);
      jumper.jumpTo('/login');
    })

  }, [history]);

  return (
    <div>Loading ...</div>
  )
}