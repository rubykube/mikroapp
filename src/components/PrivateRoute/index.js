import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({isAuthenticated, isLoading, ...props }) => {
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isLoading && !isAuthenticated) {
    return <Redirect to="/login" />
  }
  return <Route {...props}/>;
};

export default PrivateRoute;
