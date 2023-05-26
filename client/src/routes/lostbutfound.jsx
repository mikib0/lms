import { SimpleGrid, Title, rem, Modal, FileInput, TextInput, Button, Group } from '@mantine/core';
import { ImageCard } from '../components';
import { AiFillPicture } from 'react-icons/ai';
import { useForm } from '@mantine/form';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import { getLostButFounds, uploadLostButFound } from '../services';
import { useLoaderData } from 'react-router-dom';
import { withUserType } from '../hocs';

export async function action({ request }){
  const data = await request.formData()
  await uploadLostButFound(data)
  return null
}

export async function loader(){
  return await getLostButFounds()
}

function LostButFound({ isAdmin }) {
  const [showAddPictureModal, setShowAddPictureModal] = useState(false);
  const lostbutfounds = useLoaderData()
  const form = useForm({
    initialValues: {
      picture: null,
      description: ''
    }
  })

  return (
    <>
      <Title order={2} mb='md'>
        Lost But Found
      </Title>
      {isAdmin ? (
        <Group mb='md' position='right'>
          <Button
            onClick={() => setShowAddPictureModal(true)}
            leftIcon={<AiFillPicture />}>
            Add picture
          </Button>
        </Group>
      ) : null}
      <SimpleGrid
        cols={4}
        spacing='lg'
        breakpoints={[
          { maxWidth: 'md', cols: 4, spacing: 'md' },
          { maxWidth: 'sm', cols: 3, spacing: 'sm' },
          { maxWidth: 'xs', cols: 2, spacing: 'sm' },
          { maxWidth: rem(400), cols: 1, spacing: 'sm' },
        ]}>
        {lostbutfounds.map(({ description, src }) => (
          <ImageCard description={description} src={src} />
        ))}
      </SimpleGrid>

      <Modal opened={showAddPictureModal} onClose={()=>setShowAddPictureModal(false)}>
        <Title order={3}>UPLOAD PICTURE</Title>
        <Form method='post' accept='image/*' enctype='multipart/form-data' onSubmit={ () => setShowAddPictureModal(false) }>
          <FileInput name='picture' label='Pick a picture' {...form.getInputProps('picture')} />
          <TextInput name='description' label='Image Description' />
          <Button mt='md' type='submit'>Submit</Button>
        </Form>

      </Modal>
    </>
  );
}


export default withUserType(LostButFound)