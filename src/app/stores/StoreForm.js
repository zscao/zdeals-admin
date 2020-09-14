import React, { useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import _ from 'lodash';

import { FormErrorBlock } from '../shared';

import { storeFormValidation as validation } from './validation';

function StoreForm(props) {

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    const initValues = _.cloneDeep(props.initValues);
    if(initValues) {
      reset(initValues);
    }
  }, [props.initValues, reset])

  function onFormSubmit(values) {
    if(typeof(props.onSubmit) !== 'function') return;
    props.onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Name</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="name" isInvalid={!!errors.name} placeholder="Store Name" ref={register(validation.name)} />
          <FormErrorBlock error={errors.name} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Website</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="website" isInvalid={!!errors.website} placeholder="Website Address" ref={register(validation.website)} />
          <FormErrorBlock error={errors.website} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Domain</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="domain" isInvalid={!!errors.domain} placeholder="Main Domain Name" ref={register(validation.domain)} />
          <FormErrorBlock error={errors.domain} />
        </Col>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}

export default StoreForm;