/**
 * Login Page Component
 * Initial page with Microsoft authentication
 * Simulates authentication flow for demo purposes
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin, message, Card } from 'antd';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle Microsoft login button click
   */
  const handleMicrosoftLogin = async () => {
    setError(null);
    try {
      await login();
      // Redirect to home/invoice listing on success
      navigate('/invoices');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      message.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-2xl border-0"
        style={{ borderRadius: '12px' }}
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            📋
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Invoice Processing
          </h1>
          <p className="text-gray-600">
            Human-in-the-Loop HITL System
          </p>
        </div>

        {/* Welcome Text */}
        <div className="mb-8 text-center">
          <p className="text-gray-700 font-medium mb-2">
            Welcome to the Invoice Processing System
          </p>
          <p className="text-gray-500 text-sm">
            Sign in with your Microsoft account to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mb-6 flex justify-center">
            <Spin tip="Authenticating..." />
          </div>
        )}

        {/* Microsoft Login Button */}
        <Button
          onClick={handleMicrosoftLogin}
          disabled={isLoading}
          size="large"
          className="w-full mb-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold h-12 text-base border-0"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
              </svg>
              Sign in with Microsoft
            </span>
          )}
        </Button>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Demo Mode:</strong>
          </p>
          <p className="text-xs text-gray-600">
            This is a simulated authentication. Click the button above to proceed with a demo account.
            In production, this will integrate with Azure AD for real Microsoft authentication.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Electrolux. All rights reserved.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
