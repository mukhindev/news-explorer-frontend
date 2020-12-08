import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, ...props }) => (
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

export default ProtectedRoute;
