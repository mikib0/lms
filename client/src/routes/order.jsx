import { List, Title } from '@mantine/core';
import { useEffect } from 'react';
import { Notification, OrderForm } from '../components';
import { useNotification } from '../hooks/useNotification';
import { createOrder } from '../services';
import { isPageRedirecting } from '../utils';

const handleSubmit = async (e, form) => {
  e.preventDefault();
  await createOrder(form.values);
  form.reset();
};

export default function () {
  // const order = useActionData()
  // const navigate = useNavigate()
  // TODO toast

  // useEffect(()=>{
  //    if(order !== undefined) navigate('/order')
  // }, [order])

  const isRedirecting = isPageRedirecting()
  const {
    showNotification: showNotificationBool,
    show: showNotification,
    hide: hideNotification,
  } = useNotification(false);

  useEffect(() => {
    if (isRedirecting) {
      showNotification();
    }
  }, [isRedirecting, showNotification]);

  return (
    <>
      <Title order={2} mb='md'>
        Request Order
      </Title>
      <Title order={4}>Important instructions</Title>
      <List>
        <List.Item>
          We request that students remove items and empty pockets prior to
          leaving items with us as we cannot be held resposible for damage or
          lost of items.
        </List.Item>
        <List.Item>
          Any lost items must be reported to the hostel manager.
        </List.Item>
        <List.Item>
          If any clothes is been brought to the laundry room, Students must
          indicate the laundry staff that was incharge at the time.
        </List.Item>
      </List>

      <OrderForm reset={isRedirecting} action='/orders/create' />

      <Notification
        onClose={hideNotification}
        hidden={!showNotificationBool}
        title='Order Requested'
        message='Your order has been requested successfully.'
      />
    </>
  );
}
