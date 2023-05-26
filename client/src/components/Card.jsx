import { Flex, Paper, Text } from '@mantine/core';

export default function ({ title, value }) {
  return (
    <Paper ta='center' shadow='xs' p='md' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Text fw='lighter' fz={{ base: 12, sm: 10 }}>{title}</Text>
      <Text fw='bold' fz={{base: 32}}>{value}</Text>
    </Paper>
  );
}
