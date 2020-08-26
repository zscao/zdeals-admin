import React from 'react';

import { Form } from 'react-bootstrap';

export function FormErrorBlock(props) {
  const error = props.error;
  if(!error) return null;

  return (
    <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>
  )
}