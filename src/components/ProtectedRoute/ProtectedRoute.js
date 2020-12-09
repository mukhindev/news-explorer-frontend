import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  path,
  onRedirect,
  ...props
}) => {
  useEffect(() => {
    if (!localStorage.getItem('token')) return () => onRedirect();
    return null;
  }, [onRedirect]);

  return (
    <Route
      path={path}
    >
      {
        localStorage.getItem('token')
          ? <Component {...props} path={props.path} />
          : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
