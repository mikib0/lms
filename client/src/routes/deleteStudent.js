import { redirect } from 'react-router-dom';
import { deleteStudent } from '../services';

export  async function action({ params }) {
  console.log(params)
  await deleteStudent(params.studId);
  return redirect('/students');
}
