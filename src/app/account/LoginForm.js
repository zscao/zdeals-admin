import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const defaultValues = {
  username: process.env.REACT_APP_TEST_USERNAME,
  password: process.env.REACT_APP_TEST_PASSWORD
};

export default function LoginForm({onSubmit}) {

  const { register, handleSubmit } = useForm({defaultValues});

  function submit(values) {
    if(typeof(onSubmit) !== 'function') return;
    onSubmit(values);
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Group>
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" name="username" placeholder="user name"  ref={register}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="password"  ref={register}/>
      </Form.Group>
      <Form.Group>
        <Form.Check type="checkbox" label="Remember me on this device" />
      </Form.Group>
      <Button variant="primary" type="submit">Login</Button>
    </Form>
  )
}