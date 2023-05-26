import { redirect } from 'react-router-dom';
import { cancelOrder } from '../services';

export default async function action({ params }) {
  console.log(params.orderId)
  await cancelOrder(params.orderId);
  return redirect('/history')
}
