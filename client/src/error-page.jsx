import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { NonExistingUserError } from './errors';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.log(error);

  useEffect(() => {
    if (error instanceof NonExistingUserError) {
      return navigate('/login');
    } else{
      return navigate('/')
    }
  }, []);

  return (
    <div id='error-page'>
      <h1>An Error Occured!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <Link to='/'>Return home</Link>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
