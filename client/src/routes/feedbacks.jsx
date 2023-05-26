import { Avatar, Box, Flex, Text, Title } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';
import { getFeedbacks } from '../services';

export async function loader(){
  return await getFeedbacks()
}

export default function () {
  const feedbacks = useLoaderData();
  return (
    <>
      <Title order={1} mb='md'>
        Feedbacks
      </Title>
      {feedbacks.map(({ profileImage, type, title, description }) => (
        // TODO Type
        <Flex gap='md' mb='sm' >
          <Avatar src={`/api/images/${profileImage}`} size='lg' radius={50} />
          <Box>
            <Title order={3}>{title}</Title>
            <Text lh={1}>{description}</Text>
          </Box>
        </Flex>
      ))}
    </>
  );
}