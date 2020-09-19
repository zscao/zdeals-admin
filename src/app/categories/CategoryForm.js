import React, { useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import _ from 'lodash';

import { FormErrorBlock } from '../shared';

import { categoryFormValidation as validation } from './validation';

function CategoryForm({initValues, mode, onSubmit}) {

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    const values = _.cloneDeep(initValues);
    reset(values);
  }, [initValues, reset])

  function onFormSubmit(values) {
    if(typeof(onSubmit) !== 'function') return;
    
    values.title = values.title.trim();
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
        <Form.Label column lg={2}>Code</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="code" isInvalid={!!errors.code} placeholder="Unique Code" ref={register(validation.code)} readOnly={mode==='edit'} />
          <FormErrorBlock error={errors.code} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Title</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="title" isInvalid={!!errors.name} placeholder="Category Title" ref={register(validation.title)} />
          <FormErrorBlock error={errors.title} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Display Order</Form.Label>
        <Col lg={10}>
          <Form.Control type="number" name="displayOrder" isInvalid={!!errors.displayOrder} placeholder="Display Order" ref={register(validation.displayOrder)} />
          <FormErrorBlock error={errors.displayOrder} />
        </Col>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}

export default CategoryForm;