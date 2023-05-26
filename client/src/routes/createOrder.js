import { redirect } from 'react-router-dom';
import { createOrder } from '../services';

export default async function ({ request }) {
  const orderData = Object.fromEntries(await request.formData());
  await createOrder(orderData);
  return redirect('/order');
}