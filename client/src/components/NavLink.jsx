import { Box, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

export default function({ name, route, Icon, onClick, }){
  return (
    <Box
      component={NavLink}
      to={route}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'black',
        textDecoration: 'none',
      }}>
      <Icon size={24} color='black' />{' '}
      <Text size='lg' align='center'>
        {name}
      </Text>
    </Box>
  );
}