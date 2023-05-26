import { Box, Flex, Stack, Table, Text, Title } from '@mantine/core';
import React from 'react';
import { AdminDashboard, StudentDashboard } from '../components';
import { useRouteLoaderData } from 'react-router-dom';

export default function Dashboard() {
  const {user} = useRouteLoaderData('root');

  return (
    <>
      <Title order={2} mb='md'>
        Dashboard
      </Title>
      {user.isAdmin ? <AdminDashboard /> : <StudentDashboard />}
    </>
  );
}
