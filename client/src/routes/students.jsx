import {
  Button,
  Table,
  Title,
  Box,
  Modal,
  FileInput,
  Divider,
  Avatar,
  createStyles,
  TextInput,
  Container,
  Radio,
  Group,
  PasswordInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { Form, useLoaderData } from 'react-router-dom';
import { createNewStudent, deleteStudent, getStudents } from '../services';
import { useFetcher } from 'react-router-dom';
import { isPageRedirecting } from '../utils';
import { useNotification } from '../hooks/useNotification';
import { Notification } from '../components';
import { useNavigation } from 'react-router-dom';

export function loader() {
  return getStudents();
}

export async function action({ request }) {
  const data = await request.formData();
  return await createNewStudent(data);
}

const useStyles = createStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  image: {
    // gridColumn: '1  2'
  },
  gender: {
    gridColumn: '2 / span 2',
  },
}));

export default function () {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const { classes } = useStyles();
  const students = useLoaderData();
  const imageInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const fetcher = useFetcher();

  const navigation = useNavigation();
  const isRedirecting =
    fetcher.state == 'loading' &&
    fetcher.formData != null &&
    fetcher.formAction !== navigation.location.pathname; // TODO endgame
  const {
    showNotification: showNotificationBool,
    show: showNotification,
    hide: hideNotification,
  } = useNotification(false);

  useEffect(() => {
    if (isRedirecting) {
      showNotification();
    }
  }, [isRedirecting, showNotification]);

  const rows = students.map(({ firstName, lastName, id, phoneNumber }) => (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{id}</td>
      <td>{phoneNumber}</td>
      <td>
        <fetcher.Form method='post' action={`${id}/delete`}>
          <Button
            bg='red'
            c='white'
            type='submit'
            leftIcon={<MdDelete size={16} />}>
            Delete
          </Button>
        </fetcher.Form>
      </td>
    </tr>
  ));

  const chooseImage = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (file) => {
    var reader = new FileReader();

    reader.onload = function () {
      setImageSrc(reader.result);
    };
    setImage(file); 
    reader.readAsDataURL(file);
  };

  const form = useForm({
    initialValues: {
      gender: 'male',
      firstName: '',
      lastName: '',
      id: '',
      hostel: '',
      level: '',
      department: '',
      room: '',
      dormAdvisor: '',
      phoneNumber: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [dob, setDob] = useState(null)

  return (
    <>
      <Title order={2} mb='md'>
        Students List
      </Title>
      <Button
        onClick={() => {
          setShowCreateUserModal(true);
        }}
        mb='md'
        leftIcon={<GoPlus size={20} />}>
        Create user
      </Button>
      <Box sx={{ overflowX: 'scroll' }}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>ID</th>
              <th>Phone No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
      <Modal
        size='lg'
        opened={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}>
        <fetcher.Form
          onSubmit={() => setShowCreateUserModal(false)}
          method='post'
          enctype='multipart/form-data'>
          <Title order={3}>PERSONAL DETAILS</Title>
          <div className={classes.container}>
            <div className={classes.image}>
              <Title order={4}>Profile Image</Title>
              {/* TODO update the src of the avatar to the choosen image  */}
              <Avatar
                src={(()=>{
                  console.log(imageSrc)
                  console.log(image)
                  return imageSrc
                })()}
                onClick={chooseImage}
                sx={{ cursor: 'pointer' }}
                size='xl'
              />
              <FileInput
                name='image'
                value={image}
                onChange={handleImageChange}
                display='none'
                ref={imageInputRef}
                // {...form.getInputProps('image')}
              />
            </div>
            <div className={classes.gender}>
              <Title order={4}>Gender</Title>
              <Radio.Group name='gender' {...form.getInputProps('gender')}>
                <Group mt='xs'>
                  <Radio value='male' name='male' label='male' />
                  <Radio value='female' name='fmale' label='female' />
                </Group>
              </Radio.Group>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <TextInput
                  name='firstName'
                  label='First Name'
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  name='lastName'
                  label='Last Name'
                  {...form.getInputProps('lastName')}
                />
              </Box>
            </div>
            <TextInput name='id' label='ID' {...form.getInputProps('id')} />
            <TextInput
              name='phoneNumber'
              label='Phone Number'
              {...form.getInputProps('phoneNumber')}
            />
            <DateInput
              name='dob'
              label='Date of Birth'
              value={dob}
              onChange={setDob}
            />
            <TextInput
              name='hostel'
              label='Hostel'
              {...form.getInputProps('hostel')}
            />
            <TextInput
              name='level'
              label='Level'
              {...form.getInputProps('level')}
            />
            <TextInput
              name='department'
              label='Department'
              {...form.getInputProps('department')}
            />
            <TextInput
              name='room'
              label='Room Number'
              {...form.getInputProps('room')}
            />
            <TextInput
              name='dormAdvisor'
              label='Dorm Advisor'
              {...form.getInputProps('dormAdvisor')}
            />
          </div>

          <Divider my='md' />
          <Title order={3}>ACCOUNT INFORMATION</Title>
          <TextInput
            name='email'
            label='Email Address'
            {...form.getInputProps('email')}
          />
          <TextInput
            name='username'
            label='Username'
            {...form.getInputProps('username')}
          />
          <PasswordInput
            name='password'
            label='Password'
            {...form.getInputProps('password')}
          />
          <PasswordInput
            name='confirmPassword'
            label='Confirm Password'
            {...form.getInputProps('confirmPassword')}
          />
          <Group position='center' mt='md'>
            <Button type='submit'>Submit</Button>
          </Group>
        </fetcher.Form>
      </Modal>

      <Notification
        onClose={hideNotification}
        hidden={!showNotificationBool}
        title='Student Deleted'
        message='Student has been deleted successfully.'
      />
    </>
  );
}
