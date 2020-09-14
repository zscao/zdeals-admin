import React, { useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import _ from 'lodash';

import { FormErrorBlock } from '../shared';

import { brandFormValidation as validation } from './validation';

function BrandForm({initValues, onSubmit}) {

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    const values = _.cloneDeep(initValues);
    reset(values);
  }, [initValues, reset])

  function onFormSubmit(values) {
    if(typeof(onSubmit) !== 'function') return;
    
    values.name = values.name.trim();
    values.code = values.code.trim();

    if(!values.displayOrder) {
      values.displayOrder = 0;
    }
    else {
      values.displayOrder = parseInt(values.displayOrder);
    }

    onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Name</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="name" isInvalid={!!errors.name} placeholder="Brand Name" ref={register(validation.name)} />
          <FormErrorBlock error={errors.name} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Code</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="code" isInvalid={!!errors.code} placeholder="Unique Code" ref={register(validation.code)} />
          <FormErrorBlock error={errors.code} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Display Order</Form.Label>
        <Col lg={10}>
          <Form.Control type="number" name="displayOrder" isInvalid={!!errors.displayOrder} placeholder="Display Order" ref={register(validation.displayOrder)} />
          <FormErrorBlock error={errors.domain} />
        </Col>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}

export default BrandForm;