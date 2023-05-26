import { redirect } from 'react-router-dom';
import { updateOrder } from '../services';

export default async function action({ request, params }) {
  const update = Object.fromEntries(await request.formData())
  await updateOrder(update, params.orderId);
  return redirect('/history');
}
