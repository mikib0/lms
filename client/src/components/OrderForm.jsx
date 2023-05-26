import {
  Button,
  Flex,
  Group,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { Form } from 'react-router-dom';

export default function ({ order, reset, action, onSubmit, submitButtonText }) {
  const form = useForm({
    initialValues: {
      shirts: order ? order.shirts : 0,
      trousers: order ? order.trousers : 0,
      underwears: order ? order.underwears : 0,
      staff: order ? order.staff : '',
      instructions: order ? order.instructions : '',
    },
  });

  useEffect(() => {
    if (reset) {
      form.reset();
    }
  }, [reset]);

  return (
    <Form
      onSubmit={(e) => {
        const fv = form.values;
        const allAreZero =
          fv.shirts < 1 && fv.trousers < 1 && fv.underwears < 1;
        const someAreLessThanZero =
          fv.shirts < 0 || fv.trousers < 0 || fv.underwears < 0;
        if (allAreZero || someAreLessThanZero) {
          console.log('dont submit');
          e.preventDefault();
          return;
        }
        if (onSubmit) onSubmit();
      }}
      method='post'
      action={action ?? ''}>
      <Flex justify='space-between' gap={8}>
        <NumberInput
          min='0'
          name='shirts'
          label='Number of Shirts'
          {...form.getInputProps('shirts')}
        />
        <NumberInput
          min='0'
          name='trousers'
          label='Number of Trousers'
          {...form.getInputProps('trousers')}
        />
      </Flex>
      <Flex justify='space-between' gap={8}>
        <NumberInput
          min='0'
          name='underwears'
          label='Number of Underwears'
          {...form.getInputProps('underwears')}
        />
        {/* <Select
          label='Your favorite framework/library'
          placeholder='Pick one'
          searchable
          nothingFound='No options'
          data={['React', 'Angular', 'Svelte', 'Vue']}
        /> */}
        <TextInput
          name='staff'
          label='Staff in Charge'
          {...form.getInputProps('staff')}
        />
      </Flex>
      <Textarea
        name='instructions'
        label='Special instructions (if any)'
        {...form.getInputProps('instructions')}
      />
      <Group position='center' mt='md'>
        <Button type='submit'>{submitButtonText ?? 'Send'}</Button>
      </Group>
    </Form>
  );
}
