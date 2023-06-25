import {
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Highlight,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { useActionData } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { Form } from 'react-router-dom';
import { LoginError } from '../errors';
import { authenticate } from '../services';

export async function action({ request }) {
  const loginData = Object.fromEntries(await request.formData());
  try {
    await authenticate(loginData);
    return redirect('/');
  } catch (err) {
    if (err instanceof LoginError) {
      return err;
    } else {
      throw err;
    }
  }
}

export default function Login() {
  const error = useActionData();
  const [showErr, setShowErr] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  useEffect(() => {
    let timeout;
    if (error?.message) {
      setShowErr(error instanceof LoginError);
      timeout = setTimeout(() => setShowErr(false), 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [error]);

  return (
    <>
      <Flex direction='column' align='center' mb='lg' pt={{ base: 80 }}>
        <Title>Login</Title>
        <Text>Sign in to your account</Text>
      </Flex>
      <Container w={{ base: 300 }}>
        <Text size='sm' color='red' display={showErr ? 'block' : 'none'}>
          {error?.message}
        </Text>
        <Form id='loginForm' method='post'>
          <TextInput
            withAsterisk
            name='email'
            label='Email'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            name='password'
            label='Password'
            {...form.getInputProps('password')}
          />
          <Checkbox
            mt='md'
            name='rememberMe'
            label='Remember me'
            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
          />
          <Group position='right' mt='md'>
            <Button fullWidth={true} type='submit'>
              Login
            </Button>
          </Group>
          <details style={{ marginTop: 8 }}>
            <summary>Expand for Guest login</summary>
            <ul style={{ margin: 0, padding: 0, marginTop: 4, paddingLeft: 24 }}>
              <li>
                <Highlight size='xs' highlight={['admin@guest.com', 'guest']}>
                  use admin@guest.com and guest for admin login
                </Highlight>
              </li>
              <li>
                <Highlight size='xs' highlight={['student@guest.com', 'guest']}>
                  use student@guest.com and guest for student login
                </Highlight>
              </li>
            </ul>
          </details>
        </Form>
      </Container>
    </>
  );
}