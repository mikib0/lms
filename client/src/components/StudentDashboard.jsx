import { Flex, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getStudent } from '../services';

const Info = ({ label, value }) => (
  <Flex justify='flex-start' align='center' gap={8}>
    <Text fw='bold'>{label}</Text> <Text>{value}</Text>
  </Flex>
);

export default function () {
  const [student, setStudent] = useState(null);
  const {firstName, lastName, department, hostel, room, dormAdvisor} = student ?? {}

  useEffect(() => {
    (async () => {
      setStudent(await getStudent());
    })();
  }, []);

  return student ? (
    <Stack>
      <Info label='First Name' value={`${firstName} ${lastName}`} />
      <Info label='Department' value={department} />
      <Info label='Hostel' value={hostel} />
      <Info label='Room' value={room} />
      <Info label='Dorm Advisor' value={dormAdvisor} />
    </Stack>
  ) : (
    <div>loading...</div>
  );
}
