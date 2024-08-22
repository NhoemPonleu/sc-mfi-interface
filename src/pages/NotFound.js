import React from 'react';
import { Navigate } from 'react-router-dom';

function NotFound() {
  // Use Navigate component to redirect to a 404 route
  return <Navigate to="/404" replace />;
}
