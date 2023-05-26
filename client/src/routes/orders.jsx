import {
  Box,
  Button,
  Container,
  Modal,
  Table,
  Title,
  createStyles,
  Text,
  Checkbox,
  TextInput,
} from '@mantine/core';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { GoSearch } from 'react-icons/go';
import { useState } from 'react';

export function loader() {
  return fetch('/api/orders');
}

const useStyles = createStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 4,
  },
  instruction: {
    gridColumn: '1 / span 2',
  },
});

export default function () {
  const [showOrderViewModal, setShowOrderViewModal] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);
  const [query, setQuery] = useState('')
  const { classes } = useStyles();
  const orders = useLoaderData();
  const fetcher = useFetcher();

  const rows = orders.filter(({orderedBy})=> new String(orderedBy).includes(query) ).map(({ orderedBy, id, status, date }, i) => {
    const completed = status == 'completed';
    const rejected = status == 'rejected';
    const canceled = status == 'canceled';
    const pending = status == 'pending';
    const disabled = !pending
    return (
      <tr
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          if (e.target.closest('form') || e.target.closest('input')) return;
          setOrderIndex(i);
          setShowOrderViewModal(true);
        }}>
        <td>{orderedBy}</td>
        <td>{date}</td>
        <td>
          <fetcher.Form
            style={{ display: 'inline-block' }}
            method='post'
            action={`${id}/approve`}>
            <Button
              disabled={disabled}
              type='submit'
              c='white'
              bg='blue'
              mr={{ base: 'sm', md: 'md' }}
              rightIcon={<BsCheckLg size={24} />}>
              Approve
            </Button>
          </fetcher.Form>
          <fetcher.Form
            style={{ display: 'inline-block' }}
            method='post'
            action={`${id}/reject`}>
            <Button
              disabled={disabled}
              type='submit'
              c='white'
              bg='red'
              rightIcon={<IoMdClose size={24} />}>
              Reject
            </Button>
          </fetcher.Form>
        </td>
        <td>
          <Checkbox
            checked={completed}
            disabled={completed || rejected || canceled}
            sx={{ cursor: 'pointer' }}
            onChange={() => {
              fetcher.submit(null, {
                method: 'post',
                action: `${id}/complete`,
              });
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Title order={1} mb='md'>
        Orders
      </Title>

      <Title order={3}>Orders from Students</Title>
      <TextInput
        id='q'
        name='q'
        value={query}
        label='Search orders'
        type='search'
        icon={<GoSearch size={12} />}
        mb='md'
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
      />
      <Box sx={{ overflowX: 'scroll' }}>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>ID NUMBER</th>
              <th>ORDER DATE</th>
              <th>ACTION</th>
              <th>MARK COMPLETE</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>

      <Modal
        opened={showOrderViewModal}
        onClose={() => setShowOrderViewModal(false)}>
        <Title order={3} mb='md'>
          ORDER VIEW
        </Title>
        <Container className={classes.container}>
          <Box>
            <Text fw='bold' size={10}>
              NUMBER OF SHIRTS
            </Text>
            <Text fw='bolder' size='xl'>
              {orders[orderIndex].shirts}
            </Text>
          </Box>
          <Box>
            <Text fw='bold' size={10}>
              NUMBER OF TROUSERS
            </Text>
            <Text fw='bolder' size='xl'>
              {orders[orderIndex].trousers}
            </Text>
          </Box>
          <Box>
            <Text fw='bold' size={10}>
              NUMBER OF UNDERWEARS
            </Text>
            <Text fw='bolder' size='xl'>
              {orders[orderIndex].underwears}
            </Text>
          </Box>
          <Box>
            <Text fw='bold' size={10}>
              NAME OF STAFF IN CHARGE
            </Text>
            <Text fw='bolder' size='xl'>
              {orders[orderIndex].staff}
            </Text>
          </Box>
          <Box className={classes.instruction}>
            <Text fw='bold' size={10}>
              Special Instruction
            </Text>
            <Text>{orders[orderIndex].instructions}</Text>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
