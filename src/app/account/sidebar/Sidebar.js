import React, { useMemo } from 'react'
import { matchPath } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'

import { createHistoryJumper } from '../../helpers'


export default function Sidebar({basePath, history, location}) {

  const jumper = createHistoryJumper(history)


  const action = useMemo(() => {
    const match = matchPath(location.pathname, {
      path: `${basePath}/:action`
    });
    return match && match.params && match.params.action;
  }, [location, basePath])

  return (
    <ListGroup variant="flush">
      <ListGroup.Item action active={action === 'profile'} onClick={() => jumper.jumpTo(`${basePath}/profile`)}>
        <FontAwesomeIcon icon={faUser} />
        <span className="ml-2">My Profile</span>
      </ListGroup.Item>
      <ListGroup.Item action active={action === 'password'} onClick={() => jumper.jumpTo(`${basePath}/password`)}>
        <FontAwesomeIcon icon={faKey} />
        <span className="ml-2">Change Password</span>
      </ListGroup.Item>
    </ListGroup>
  )

}