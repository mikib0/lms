import {
  Button,
  Group,
  Radio,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { createFeedback } from '../services';
import  {isPageReloading} from '../utils';
import { Notification } from '../components';
import { useNotification } from '../hooks/useNotification';

export async function action({ request }) {
  const feedback = Object.fromEntries(await request.formData());
  feedback.type = feedback.feedbackType;
  await createFeedback(feedback);
  return null;
}

export default function () {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      feedbackType: 'suggestion',
    },
  });
  const {
    showNotification: showNotificationBool,
    show: showNotification,
    hide: hideNotification,
  } = useNotification(false);
  const isReloading = isPageReloading()

  useEffect(() => {
    if (isReloading) {
      form.reset();
       showNotification()
      };
  }, [isReloading, form, showNotification]);

  return (
    <>
      <Title order={2} mb='md'>
        Help And Feedback
      </Title>
      <Form method='post'>
        <TextInput
          withAsterisk
          name='title'
          label='Title'
          placeholder='enter title'
          {...form.getInputProps('title')}
          mb='md'
        />
        <Textarea
          withAsterisk
          name='description'
          label='Description'
          placeholder='enter detailed description here'
          {...form.getInputProps('description')}
        />
        <Radio.Group
          name='feedbackType'
          label='What kind of feedback is it?'
          description='Is it a suggestion or a problem?'
          withAsterisk
          {...form.getInputProps('feedbackType')}>
          <Group mt='xs'>
            <Radio value='suggestion' label='Suggestion' />
            <Radio value='problem' label='Problem' />
          </Group>
        </Radio.Group>
        <Group position='center' mt='md'>
          <Button type='submit'>Send</Button>
        </Group>
      </Form>

      <Notification
        onClose={hideNotification}
        hidden={!showNotificationBool}
        title='Feedback submitted'
        message='Your feedback has successfully been recorded.'
      />
    </>
  );
}
