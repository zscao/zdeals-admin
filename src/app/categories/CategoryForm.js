import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import _ from 'lodash';

import { FormErrorBlock } from '../shared';

import { categoryFormValidation as validation } from './validation';

function CategoryForm({initValues, categories, mode, onSubmit}) {

  const [ categoryList, setCategoryList] = useState([]);
  const [ parentCategory, setParentCategory] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    const values = _.cloneDeep(initValues);
    reset(values);

    if(Array.isArray(categories)) {
      const list = categories.map(x =>  {
        const title = x.path.map(x => x.title).join(' / ');
        return {label: title, value: x.id};
      });
      setCategoryList(list);
      
      if(list.length > 0) {
        let parent = null;
        if(initValues && initValues.parentId) parent = list.find(x => x.value === initValues.parentId);
        //if(!parent) parent = list[0];

        setParentCategory(parent);
      }
    }
  }, [categories, initValues, setCategoryList, reset])

  const onFormSubmit = values => {
    if(typeof(onSubmit) !== 'function') return;
    
    values.title = values.title.trim();
    values.code = values.code.trim();

    if(!values.displayOrder) {
      values.displayOrder = 0;
    }
    else {
      values.displayOrder = parseInt(values.displayOrder);
    }

    if(parentCategory && parentCategory.value)
      values.parentId = parseInt(parentCategory.value);

    const result = onSubmit(values);
    if(result instanceof Promise) {
      setLoading(true);
      result.then(() => setLoading(false));
    }
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Parent Category</Form.Label>
        <Col>
          <Select options={categoryList} value={parentCategory} onChange={setParentCategory} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Code</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="code" isInvalid={!!errors.code} placeholder="Unique Code" readOnly={mode === 'edit'} ref={register(validation.code)} />
          <FormErrorBlock error={errors.code} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg={2}>Title</Form.Label>
        <Col lg={10}>
          <Form.Control type="text" name="title" isInvalid={!!errors.title} placeholder="Category Title" ref={register(validation.title)} />
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
        <Button disabled={loading} type="submit">Save</Button>
      </div>
    </Form>
  )
}

export default CategoryForm;