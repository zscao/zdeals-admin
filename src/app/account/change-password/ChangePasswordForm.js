import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { FormErrorBlock } from '../../shared'
import { validation } from './validation'

function ChangePasswordForm({onSubmit}) {

  const { register, handleSubmit, reset, errors, setError } = useForm();

  const [loading, setLoading] = useState(false);

  const onFormSubmit = values => {
    if(typeof(onSubmit) !== 'function') return;

    let valid = true;
    if(values.confirmPassword !== values.newPassword) {
      valid = false;
      setError('confirmPassword', {
        type: 'manual',
        message: 'Confirm password does not match'
      });
    }

    if(!valid) return;
    
    const result = onSubmit(values);
    if(result instanceof Promise) {
      setLoading(true);
      result
      .then(() => reset())
      .finally(() => setLoading(false));
    }
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Current Password</Form.Label>
        <Col lg={4}>
          <Form.Control type="password" name="currentPassword" isInvalid={!!errors.currentPassword} placeholder="" ref={register(validation.currentPassword)} />
          <FormErrorBlock error={errors.currentPassword} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>New Password</Form.Label>
        <Col lg={4}>
          <Form.Control type="password" name="newPassword" isInvalid={!!errors.newPassword} placeholder="" ref={register(validation.newPassword)} />
          <FormErrorBlock error={errors.newPassword} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Confirm Password</Form.Label>
        <Col lg={4}>
          <Form.Control type="password" name="confirmPassword" isInvalid={!!errors.confirmPassword} placeholder="" ref={register(validation.confirmPassword)} />
          <FormErrorBlock error={errors.confirmPassword} />
        </Col>
      </Form.Group>
      <Row>
        <Col lg={6}>
          <div className="form-buttons">
            <Button disabled={loading} type="submit">Change</Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default ChangePasswordForm