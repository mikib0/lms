import { Box, Flex, Stack, Table, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getOrders } from '../services';
import OrderStatus from './OrderStatus';

export default function () {
  const [orders, setOrders] = useState([]);

  const rows = orders.map(({ id, orderedBy, date, status }, i) => {

    return (
      <tr key={id}>
        <td>{orderedBy}</td>
        <td>{date}</td>
        <OrderStatus status={status} />
      </tr>
    );
  });

  useEffect(() => {
    (async () => {
      const orders = await getOrders();
      setOrders(orders);
    })();
  }, []);

  return (
    <>
      <Title order={3}>Recent Orders</Title>
      <Box sx={{ overflowX: 'scroll' }}>
        <Table sx={{}}>
          <thead>
            <tr>
              <th>ID NUMBER</th>
              <th>ORDER DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </>
  );
}
