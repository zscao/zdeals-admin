import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { Col, Form, Button } from 'react-bootstrap';

const defaultStore = {
  label: 'All Stores',
  value: 0
};

export default function Filter({initValues, stores, onSubmit}) {

  const [storeOptions, setStoreOptions] = useState([]);
  const [selectedStore, setSelectedStore] = useState(defaultStore);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {

    if (Array.isArray(stores)) {
      
      const storeOptions = [defaultStore, ...stores.map(x => ({ value: x.id, label: x.name }))];
      setStoreOptions(storeOptions);

      if(initValues.store) {
        const selected = storeOptions.find(x => x.value === initValues.store);
        if(selected) setSelectedStore(selected);
      }
    }
    else {
      setStoreOptions([defaultStore]);
      setSelectedStore(defaultStore);
    }

    reset(initValues);
  }, [initValues, stores, reset])

  function onFormSubmit(values) {
    if (typeof onSubmit !== 'function') return;

     if(selectedStore.value) {
      values.store = selectedStore.value;
    }
    onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Row>
        <Col lg={3}>
          <Select options={storeOptions} onChange={setSelectedStore} value={selectedStore} />
        </Col>
        <Col lg={3}>
          <Form.Label className="sr-only" htmlFor="title-keywords">Keywords</Form.Label>
          <Form.Control type="text" className="mb-2 mr-2" id="title-keywords" placeholder="keywords in title" name="keywords" ref={register} />
        </Col>
        <Col lg="auto" className="form-inline">
          {/* <Form.Check className="mr-2" type="radio" name="verified" label="All" value="" ref={register} /> */}
          <Form.Check className="mr-2" type="radio" name="verified" label="Verified" value="true" ref={register} />
          <Form.Check className="mr-2" type="radio" name="verified" label="NOT Verified" value="false" ref={register} />
        </Col>
        <Col lg="auto">
          <Button type="submit" variant="success">Filter</Button>
        </Col>
      </Form.Row>

    </Form>
  )
}