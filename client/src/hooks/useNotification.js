import { useEffect, useState } from 'react';

export function useNotification(initialState = false, timeout = 3000) {
  const [showNotification, setShowNotification] = useState(initialState);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showNotification, timeout]);

  const show = () => {
    setShowNotification(true);
  };

  const hide = () => {
    setShowNotification(false);
  };

  return {
    showNotification,
    show,
    hide,
  };
}
