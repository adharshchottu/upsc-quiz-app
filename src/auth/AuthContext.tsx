import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-app';

// Define the shape of the context
interface AuthContextProps {
  authenticated: boolean;
  user: customUserInfo | null;
  loading: boolean;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps>({
  authenticated: false,
  user: null,
  loading: true
});

export interface customUserInfo {
  displayName: string;
  photoUrl: string;
  uid:string;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<customUserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const customUserInfo: customUserInfo = {
          displayName: user.reloadUserInfo.displayName,
          photoUrl: user.reloadUserInfo.photoUrl,
          uid: user.uid
        }
        setAuthenticated(true);
        setUser(customUserInfo);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
