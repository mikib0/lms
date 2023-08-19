import { Avatar, Badge, Box, Divider, Flex, Text, Title } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';
import { getFeedbacks } from '../services';

export async function loader() {
  return await getFeedbacks();
}

export default function () {
  const feedbacks = useLoaderData();
  return (
    <>
      <Title order={1} mb='md'>
        Feedbacks
      </Title>
      {feedbacks.map(({ profileImage, type, title, description }) => (
        <Box style={{ position: 'relative' }}>
          <Flex gap='md' mb='sm'>
            <Avatar src={`/api/images/${profileImage}`} size='lg' radius={50} />
            <Box>
              <Title style={{ opacity: 0.8, marginBottom: '5px' }} order={3}>
                {title}
              </Title>
              <Text style={{ opacity: 0.9 }} lh={1}>
                {description}
              </Text>
            </Box>
          </Flex>
          <Badge
            color={type == 'problem' ? 'red' : 'blue'}
            style={{ position: 'absolute', top: '10px', right: '10px' }}>
            {type}
          </Badge>
          <Divider style={{ marginBottom: '20px' }} />
        </Box>
      ))}
    </>
  );
}
