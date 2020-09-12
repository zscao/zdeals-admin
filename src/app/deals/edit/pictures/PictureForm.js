import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { FormErrorBlock } from '../../../shared'
import { pictureFormValidation as validation } from './validation';

export default function PictureForm({initValues, onSubmit}) {

  const { register, handleSubmit, reset, errors } = useForm()

  const [loading, setLoading ] = useState(false);

  useEffect(() => {
    reset(initValues);
  }, [initValues, reset])

  function onFormSubmit(values) {
    if(typeof(onSubmit) === 'function') {
      const result = onSubmit(values);
      if(result instanceof Promise) {
        setLoading(true);
        result.finally(() => setLoading(false));
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>File Name</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="fileName" placeholder="" ref={register} readOnly />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Title</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="title" isInvalid={!!errors.title} placeholder="" ref={register(validation.title)} />
          <FormErrorBlock error={errors.title}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Alt</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="alt" isInvalid={!!errors.alt} placeholder="" ref={register(validation.alt)} />
          <FormErrorBlock error={errors.alt} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}></Form.Label>
        <Col lg={10}>
          <Form.Check type="checkbox" name="isDefaultPicture" label="Set as default picture" ref={register} />
        </Col>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Form>
  )
}