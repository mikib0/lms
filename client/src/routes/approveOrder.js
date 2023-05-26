import { redirect } from 'react-router-dom';
import { approveOrder } from '../services';

export default async function({ params }) {
  await approveOrder(params.orderId);
  return redirect('/orders');
}
