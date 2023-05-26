import {
  Box,
  Button,
  Container,
  Flex,
  Modal,
  SimpleGrid,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import {
  useLoaderData,
  useNavigate,
  useFetcher,
  Form
} from 'react-router-dom';
import { Card, Notification, OrderForm, OrderStatus } from '../components';
import { GoSearch } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { getOrderHistory, updateOrder } from '../services';
import { useNotification } from '../hooks/useNotification';
import { isPageRedirecting } from '../utils';

export async function loader({ request }) {
  return await getOrderHistory()
}

let orders

export default function () {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('')
  orders = useLoaderData()
  orders = query !== '' ? orders.filter(order=>order.id==query) : orders
  const totalOrders = orders.length;
  const fetcher = useFetcher();

  const isRedirecting = isPageRedirecting();
    const {
      showNotification: showNotificationBool,
      show: showNotification,
      hide: hideNotification,
    } = useNotification(isRedirecting);

    useEffect(() => {
      if (isRedirecting) {
        showNotification();
      }
    }, [isRedirecting, showNotification]);


  const completedOrders = orders.reduce(
    (acc, curr) => (curr.status == 'completed' ? ++acc : acc),
    0
  );
  const pendingOrders = orders.reduce(
    (acc, curr) => (curr.status == 'pending' ? ++acc : acc),
    0
  );
  const canceledOrders = orders.reduce(
    (acc, curr) => (curr.status == 'canceled' ? ++acc : acc),
    0
  );

  const rows = orders.map(({ id, date, status }, i) => {
    const disabled = status != 'pending';

    return (
      <tr key={id}>
        <td>{i + 1}</td>
        <td>{id}</td>
        <td>{date}</td>
        <OrderStatus status={status} />
        <td>
          <Button
            disabled={disabled}
            onClick={() => {
              setOrder(orders[i]);
              setShowUpdateModal(true);
            }}
            bg='blue'
            mr='sm'
            type='button'>
            Update
          </Button>
          <fetcher.Form style={{ display: 'inline-block' }} method='post' action={`${orders[i].id}/cancel`}>
            <Button disabled={disabled} bg='red' type='submit'>
              Cancel
            </Button>
          </fetcher.Form>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Title order={2} mb='md'>
        Order History
      </Title>

      <SimpleGrid
        cols={4}
        spacing='lg'
        breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 3, spacing: 'sm' },
          { maxWidth: 'xs', cols: 2, spacing: 'sm' },
        ]}
        // justify='space-between'
        // direction='row'
        // wrap='wrap'p
        mb='md'>
        <Card title='Total Number of Order' value={totalOrders} />
        <Card title='Completed Orders' value={completedOrders} />
        <Card title='Pending Orders' value={pendingOrders} />
        <Card title='Canceled Orders' value={canceledOrders} />
      </SimpleGrid>

      <Container>
        <Title order={4}>My Orders</Title>
        <Form id='search-form' role='search'>
          <TextInput
            id='q'
            name='q'
            value={query}
            label='Search'
            type='search'
            icon={<GoSearch size={12} />}
            mb='md'
            onChange={(event) => {
              setQuery(event.currentTarget.value);
            }}
          />
        </Form>

        <Box sx={{ overflowX: 'scroll' }}>
          <Table sx={{}}>
            <thead>
              <tr>
                <th>S/NO</th>
                <th>ORDER ID</th>
                <th>ORDER DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </Container>

      <Modal
        opened={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title='My Order'>
        {order ? 
        <OrderForm
          reset={isRedirecting}
          action={`${order.id}/update`}
          order={order}
          onSubmit={()=>setShowUpdateModal(false)}
          submitButtonText='Update'
        /> : null
        }
      </Modal>

      <Notification
        onClose={hideNotification}
        hidden={!showNotificationBool}
        title='Order Updated'
        message='Your order has been updated successfully.'
      />
    </>
  );
}
