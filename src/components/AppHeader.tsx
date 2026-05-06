/**
 * Application Header Component
 * Top navigation bar for the Invoice Processing HITL System
 * Displays branding, navigation, and user account options
 */

import React from 'react';
import { Layout, Button, Dropdown, Avatar, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * User menu items
   */
  const userMenuItems = [
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </div>
      ),
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout.Header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-6 max-w-screen-2xl mx-auto">
        {/* Logo / Brand */}
        <Link to="/invoices" className="flex items-center gap-3 no-underline">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            📋
          </div>
          <h1 className="text-xl font-bold text-gray-800 m-0">
            Invoice Processing
          </h1>
        </Link>

        {/* Navigation / User Section */}
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            <Link
              to="/invoices"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
            >
              Work Queue
            </Link>
          </nav>

          {/* User Account Section */}
          {user && (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: '#1890ff',
                  }}
                >
                  {user.displayName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </Avatar>
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {user.displayName}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            </Dropdown>
          )}

          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            System Ready
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;
