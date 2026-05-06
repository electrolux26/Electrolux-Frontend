/**
 * Authentication Context
 * Manages user authentication state across the application
 * Simulates Microsoft authentication for demo purposes
 * Later: Replace with real Azure AD integration via @azure/msal-browser
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  displayName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Simulates Microsoft authentication login
   * In production, this would use @azure/msal-browser
   * Later: Replace with real OAuth flow
   */
  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful authentication
      const mockUser: AuthUser = {
        id: 'user-123',
        email: 'user@electrolux.com',
        name: 'John Doe',
        displayName: 'John Doe',
      };

      // Store token in localStorage (mock)
      localStorage.setItem('auth_token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));

      setUser(mockUser);
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout the user
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }, []);

  /**
   * Check for existing session on mount
   */
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('auth_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
