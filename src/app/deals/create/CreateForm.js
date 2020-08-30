import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { FormErrorBlock } from '../../shared'
import { dealFormValidation as validation } from '../shared/validation'


function DealForm(props) {

  const { register, handleSubmit, getValues, errors } = useForm()
  const [checking, setChecking] = useState(false);
  const [existedId, setExistedId] = useState(-1);

  const onFormSubmit = values => {
    if (typeof (props.onSubmit) !== 'function') return;
    props.onSubmit(values);
  }

  const checkExistence = () => {
    if (typeof (props.onCheckExistence) !== 'function') return;

    var values = getValues();
    if (!values.source) return;

    const source = values.source.trim();
    if (!source) return;

    setChecking(true);
    props.onCheckExistence(source)
      .then(response => {
        setChecking(false);
        //console.log('existed: ', response);
        if (response.existing && response.deal.id > 0) {
          setExistedId(response.deal.id);
        }
        else {
          setExistedId(-1);
        }
      })
      .catch(() => {
        setChecking(false);
      })
  }

  const viewSource = () => {
    var values = getValues();
    if (!values.source) return;

    window.open(values.source);
  }


  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} AutoComplete={false}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Source</Form.Label>
        <Col lg={10}>
          <InputGroup>
            <Form.Control
              type="text"
              name="source"
              isInvalid={!!errors.source}
              placeholder="The URL of the original page"
              onBlur={checkExistence}
              ref={register(validation.source)} />
            <InputGroup.Append>
              <Button variant="warning" disabled={checking} onClick={checkExistence}>{checking ? <Spinner animation="grow" size="sm" /> : 'Check'}</Button>
              <Button variant="info" onClick={viewSource}>View</Button>
            </InputGroup.Append>
            <FormErrorBlock error={errors.source} />
          </InputGroup>
          {existedId > 0 && <Alert variant="warning">
            This deal alread exists. Click <Alert.Link href={`/deals/list/edit/${existedId}`}>here</Alert.Link> to edit it.
          </Alert>}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Title</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="title" isInvalid={!!errors.title} placeholder="Title" ref={register(validation.title)} />
          <FormErrorBlock error={errors.title} />
        </Col>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  )
}

export default DealForm;