import { redirect } from 'react-router-dom';
import { rejectOrder } from '../services';

export default async function({ params }) {
  await rejectOrder(params.orderId);
  return redirect('/orders');
}
