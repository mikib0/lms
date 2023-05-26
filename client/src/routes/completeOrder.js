import { redirect } from 'react-router-dom';
import { completeOrder } from '../services';

export default async function({ params }) {
  await completeOrder(params.orderId);
  return redirect('/orders');
}
