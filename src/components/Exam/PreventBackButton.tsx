import { useEffect } from 'react';

export const PreventBackButton = () => {
  useEffect(() => {
    const preventBack = (event:any) => {
      event.preventDefault();
      event.returnValue = '';
      window.history.pushState(null, document.title, window.location.href); // Push a new state to the history stack
    };

    // Add event listener for popstate event
    window.addEventListener('popstate', preventBack);

    // Push a state to prevent going back initially
    window.history.pushState(null, document.title, window.location.href);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  return null;
};

export default PreventBackButton;
