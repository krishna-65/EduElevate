import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isauthenticate, loading } = useSelector((state) => state.auth);

  // If loading, show a loading state
  if (loading) {
    return <div>Loading...</div>; // Replace with a loader if needed
  }

  // If not authenticated, redirect to login
  if (!isauthenticate) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children
  return children;
};

export default PrivateRoute;
