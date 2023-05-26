import { useEffect, useState } from 'react';
import { getUser } from '../services';

export default function (Component) {
  return function Wrapped(props) {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
      (async () => {
        const user = await getUser();
        setIsAdmin(user.isAdmin);
      })();
    }, []);

    return isAdmin == null ? '' : <Component isAdmin={isAdmin} {...props} />;
  };
}
