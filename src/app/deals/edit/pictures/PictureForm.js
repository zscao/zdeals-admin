import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { FormErrorBlock } from '../../../shared'
import { pictureFormValidation as validation } from './validation';

export default function PictureForm(props) {

  const { register, handleSubmit, reset, errors } = useForm()

  useEffect(() => {
    reset(props.initValues);
  }, [props.initValues, reset])

  function onFormSubmit(values) {
    if(typeof(props.onSubmit) === 'function') props.onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label">File Name</Form.Label>
        <div className="col-sm-10">
          <Form.Control type="text" name="fileName" placeholder="" ref={register} readOnly />
        </div>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label">Title</Form.Label>
        <div className="col-sm-10">
          <Form.Control type="text" name="title" isInvalid={!!errors.title} placeholder="" ref={register(validation.title)} />
          <FormErrorBlock error={errors.title}/>
        </div>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label">Alt</Form.Label>
        <div className="col-sm-10">
          <Form.Control type="text" name="alt" isInvalid={!!errors.alt} placeholder="" ref={register(validation.alt)} />
          <FormErrorBlock error={errors.alt} />
        </div>
      </Form.Group>
      <Form.Group className="row">
        <Form.Label className="col-sm-2 col-form-label"></Form.Label>
        <div className="col-sm-10">
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" name="isDefaultPicture" className="form-check-input" ref={register} />
              <i className="input-helper"></i>
              Set as default picture
            </label>
          </div>
        </div>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit" size="lg">Submit</Button>
      </div>
    </Form>
  )
}