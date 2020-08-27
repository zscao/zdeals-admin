import React, { useEffect, useState, useCallback } from 'react';
import {Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import Select from 'react-select';
import moment from 'moment';
import _  from 'lodash';

import { FormErrorBlock } from '../../shared';
import { dealFormValidation as validation } from '../shared/validation';


function DealForm({ initValues, brands, onSubmit }) {

  const { register, handleSubmit, getValues, setValue, reset, errors } = useForm()
  const [discountItems, setDiscountItems] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();

  useEffect(() => {
    const values = _.cloneDeep(initValues);
    if (values) {
      values.publishedDate = moment(values.publishedDate).format('YYYY-MM-DD');
      if (values.expiryDate) values.expiryDate = moment(values.expiryDate).format('YYYY-MM-DD');

      reset(values)
    }
  }, [initValues, reset])

  useEffect(() => {
    if(Array.isArray(brands)) {
      const options = brands.map(x => ({label: x.name, value: x.code}));
      setBrandOptions(options);

      if(initValues && initValues.brand) {
        const brand = brands.find(x => x.code === initValues.brand.code);
        if(brand) setSelectedBrand({label: brand.name, value: brand.code });
      }
    }
  }, [brands, initValues, setBrandOptions, setSelectedBrand])

  const onFormSubmit = useCallback(values => {
    if (typeof (onSubmit) !== 'function') return;

    values.dealPrice = !_.isNaN(values.dealPrice) ? Number.parseFloat(values.dealPrice) : 0;
    values.fullPrice = !_.isNaN(values.fullPrice) ? Number.parseFloat(values.fullPrice) : 0;

    if (!values.expiryDate) values.expiryDate = null;
    if(selectedBrand && selectedBrand.value) {
      values.brand = selectedBrand.value;
    }

    onSubmit(values);
  }, [onSubmit, selectedBrand])

  const calculateDiscount = useCallback(() => {
    const values = getValues();    
    const dealPrice = !_.isNaN(values.dealPrice) ? Number.parseFloat(values.dealPrice) : 0;
    const fullPrice = !_.isNaN(values.fullPrice) ? Number.parseFloat(values.fullPrice) : 0;
    
    if(values.dealPrice > 0 && values.fullPrice > 0) {
      const save = fullPrice - dealPrice;
      const discount = Math.round( (save / fullPrice) * 10000) / 100;

      setDiscountItems([`< Save $${save}`, `< ${discount}% off`]);
    }
    else {
      setDiscountItems([]);
    }
  }, [getValues, setDiscountItems])

  const viewSource = () => {
    var values = getValues();
    if (!values.source) return;

    window.open(values.source);
  }


  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Source</Form.Label>
        <Col lg={10}>
          <InputGroup>
            <Form.Control
              type="text"
              name="source"
              readOnly={true}
              isInvalid={!!errors.source}
              placeholder="The URL of the original page"
              ref={register(validation.source)} />
            <InputGroup.Append>
              <Button variant="info" onClick={viewSource}>View</Button>
            </InputGroup.Append>
            <FormErrorBlock error={errors.source} />
          </InputGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Title</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="title" isInvalid={!!errors.title} placeholder="Title" ref={register(validation.title)} />
          <FormErrorBlock error={errors.title} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Highlight</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="highlight" isInvalid={!!errors.highlight} placeholder="Highlight" ref={register(validation.highlight)} />
          <FormErrorBlock error={errors.highlight} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Deal Price</Form.Label>
        <Col lg={3}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control type="number" name="dealPrice" isInvalid={!!errors.dealPrice} placeholder="0.00" ref={register(validation.dealPrice)} />
            <FormErrorBlock error={errors.dealPrice} />
          </InputGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Full Price</Form.Label>
        <Col lg={3}>
          <InputGroup lg={3}>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control type="number" name="fullPrice" isInvalid={!!errors.fullPrice} placeholder="0.00" onBlur={calculateDiscount} ref={register(validation.fullPrice)} />
            <FormErrorBlock error={errors.fullPrice} />
          </InputGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Discount</Form.Label>
        <Col lg={3}>
          <Form.Control type="text" name="discount" placeholder="" ref={register(validation.discount)} />
        </Col>
        <Form.Text>
          {discountItems.map((item, index) => <Button size="sm" variant="light" key={index} onClick={() => setValue('discount', item)}>{item}</Button>)}
        </Form.Text>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Brand</Form.Label>
        <Col lg={3}>
          {/* <Form.Control type="text" name="brand" placeholder="" ref={register(validation.brand)} /> */}
          <Select options={brandOptions} value={selectedBrand} onChange={setSelectedBrand} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Description</Form.Label>
        <Col lg={10}>
          <Form.Control as="textarea" name="description" rows="4" placeholder="" ref={register} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Published Date</Form.Label>
        <Col lg={3}>
          <Form.Control type="date" name="publishedDate" isInvalid={!!errors.publishedDate} placeholder="DD/MM/YYYY" ref={register(validation.publishedDate)} />
          <FormErrorBlock error={errors.publishedDate} />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column lg={2}>Expiry Date</Form.Label>
        <Col lg={3}>
          <Form.Control type="date" name="expiryDate" isInvalid={!!errors.expiryDate} placeholder="DD/MM/YYYY" ref={register} />
          <FormErrorBlock error={errors.expiryDate} />
        </Col>
      </Form.Group>

      <div className="form-buttons">
        <Button type="submit" size="lg">Submit</Button>
      </div>
    </Form>
  )
}

export default DealForm;