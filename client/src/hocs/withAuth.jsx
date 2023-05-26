import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO auth check will  be done in loader(s)
const isAuthenticated = () => {
  // const token = localStorage.getItem('token');
  // Add your own token validation logic here
  // return null
  return { isAdmin: true }; // TODO maybe get this from `user` returned for every auth
};

export default function withAuth(Component, ...rest) {
  return function Wrapped() {
    const navigate = useNavigate();
    const user = isAuthenticated();

    useEffect(() => {
      if (!user) {
        return navigate('/login');
      }

      if (user.isAdmin) {
        return navigate('/admin-dashboard'); //TODO
      }
    }, []);

    return <Component isAdmin={user.isAdmin} {...rest} />;
  };
}
