import {
  Avatar,
  Container,
  Title,
  Text,
  Paper,
  Center,
  Tabs,
  TextInput,
  NumberInput,
  Button,
  Group,
  PasswordInput,
  FileInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef } from 'react';
import { useNavigation, useLoaderData, Form, useSubmit } from 'react-router-dom';
import { Notification } from '../components';
import { useNotification } from '../hooks/useNotification';
import { getStudent, updateProfile } from '../services';
import { isPageReloading } from '../utils';

export async function action({ request, params }) {
  const update = await request.formData();
  return await updateProfile(update);
}

export async function loader() {
  return await getStudent();
}

export default function () {
  const imagePickerRef = useRef(null);
  const student = useLoaderData();
  const { firstName, lastName, phoneNumber, email, profileImage } = student;
  const submit = useSubmit()
  const navigation = useNavigation();
  const isReloading = isPageReloading();
  const {
    showNotification: showNotificationBool,
    show: showNotification,
    hide: hideNotification,
  } = useNotification(false);

  useEffect(() => {
    if (isReloading) {
      showNotification();
    }
  }, [isReloading, showNotification]);

  const profileForm = useForm({
    initialValues: {
      firstName,
      lastName,
      phoneNumber,
      email,
    },
  });
  const passwordForm = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      newPassword: (value) => value != passwordForm.values.confirmPassword ? 'New password must match Confirm Password' : null
    }
  });

  return (
    <Container>
      <Title order={1}>Profile</Title>
      <Paper
        shadow='xs'
        p='md'
        mb='sm'
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          onClick={() => imagePickerRef.current.click()}
          sx={{ cursor: 'pointer' }}
          src={`/api/images/${profileImage}`}
          size='xl'
        />
        <Text my='md'>
          {firstName} {lastName}
        </Text>
        <Text fs='sm' c='dimmed'>
          {email}
        </Text>
      </Paper>

      <Tabs defaultValue='update_profile' color='blue'>
        <Tabs.List>
          <Tabs.Tab value='update_profile'>Update Profile</Tabs.Tab>
          <Tabs.Tab value='change_password'>Change Password</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='update_profile' pt='xs'>
          <Form method='post' encType='multipart/form-data'>
            <TextInput
              name='firstName'
              label='First Name'
              placeholder='your name'
              {...profileForm.getInputProps('firstName')}
            />
            <TextInput
              name='lastName'
              label='Last Name'
              placeholder='your name'
              {...profileForm.getInputProps('lastName')}
            />
            <TextInput
              name='phoneNumber'
              label='Phone'
              placeholder='8145783772'
              {...profileForm.getInputProps('phoneNumber')}
            />
            <TextInput
              name='email'
              label='Email'
              placeholder='your@email.com'
              {...profileForm.getInputProps('email')}
            />
            <FileInput
              name='image'
              display='none'
              ref={imagePickerRef}
            />
            <Group position='center' mt='md'>
              <Button type='submit'>Update</Button>
            </Group>
          </Form>
        </Tabs.Panel>

        <Tabs.Panel value='change_password' pt='xs'>
          <Form method='post' encType='multipart/form-data' 
          onSubmit={passwordForm.onSubmit((data)=>{
            const formData = new FormData()
            Object.entries(data).forEach(([prop, val])=>formData.append(prop, val))
            submit(formData, { method: 'post' })
          })}
          >
            <PasswordInput
              withAsterisk
              name='oldPassword'
              label='Old Password'
              placeholder='your old password'
              {...passwordForm.getInputProps('oldPassword')}
            />
            <PasswordInput
              withAsterisk
              name='newPassword'
              label='New Password'
              placeholder='your new password'
              {...passwordForm.getInputProps('newPassword')}
            />
            <PasswordInput
              withAsterisk
              name='confirmPassword'
              label='Confirm Password'
              placeholder='confirm new password'
              {...passwordForm.getInputProps('confirmPassword')}
            />
            <Group position='center' mt='md'>
              <Button type='submit'>Change</Button>
            </Group>
          </Form>
        </Tabs.Panel>
      </Tabs>

      <Notification
        onClose={hideNotification}
        hidden={!showNotificationBool}
        title='Profile Updated'
        message='Your profile has successfully been updated.'
      />
    </Container>
  );
}
