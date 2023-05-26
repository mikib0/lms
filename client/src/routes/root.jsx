import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  Box,
  Stack,
  MediaQuery,
  Burger,
  useMantineTheme,
  Avatar,
  Flex,
  Divider,
  MantineProvider,
  Title,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { studNav, adminNav } from '../constants';
import { withUserType } from '../hocs';
import { NavLink as RouterNavLink, useLoaderData } from 'react-router-dom';
import { NavLink } from '../components';
import { logout, getUser, getStudent } from '../services';
import { IoLogOutSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export async function loader(){
  const user = await getUser();
  const student = user.isAdmin ? null : await getStudent(user.id)

  return { user, student }
}

function Root() {
  const {user, student} = useLoaderData()
  const isAdmin = user.isAdmin
  const nav = isAdmin ? adminNav : studNav;
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate()

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        navbarOffsetBreakpoint='sm'
        navbar={
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}>
            <Stack>
              {!isAdmin ? (
                <Box
                  component={RouterNavLink}
                  to='profile'
                  onClick={() => setOpened(false)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    textDecoration: 'none',
                    color: 'black',
                  }}>
                  <Avatar size='md' src={ '/api/images/' + student?.profileImage} radius='md' />
                  <Text size='lg'>{student?.firstName + ' ' + student?.lastName}</Text>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text>ADMIN</Text>
                </Box>
              )}
              <Divider />
              {nav.map((props) => {
                return <NavLink {...props} onClick={() => setOpened(false)} />;
              })}
              <NavLink
                name='Logout'
                route='#'
                Icon={IoLogOutSharp}
                onClick={async (e) => {
                  await logout();
                  navigate('/login')
                }}
              />
            </Stack>
          </Navbar>
        }
        footer={
          <Footer height={60} p='md' ta='center'>
            Copyright © 2023 Nile Laundry System, All rights reserved.
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p='md'>
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((opened) => !opened)}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='xl'
                />
              </MediaQuery>

              <Text>LMS</Text>
            </div>
          </Header>
        }>
        <Outlet />
      </AppShell>
    </MantineProvider>
  );
}

export default Root;
