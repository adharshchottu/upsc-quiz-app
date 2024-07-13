import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Flex, Spinner, Text } from '@chakra-ui/react';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { authenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    // Render null or a loading spinner while the authentication state is being determined
    return <>
      <Flex justifyContent={"center"} alignItems={"center"} h={'lg'} direction={"column"}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
        <Text mt={2}>Checking your authentication</Text>
      </Flex>
    </>
  }
  else {
    if (!authenticated) {
      return <Navigate to="/login" replace />;
    }
    else  {
      return <Component />;
    }
  }
};

export default ProtectedRoute;