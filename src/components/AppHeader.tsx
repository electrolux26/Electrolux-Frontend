/**
 * Application Header Component
 * Top navigation bar for the Invoice Processing HITL System
 * Displays branding, navigation, and user account options
 */

import React from 'react';
import { Layout, Dropdown, Avatar } from 'antd';
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
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-screen-2xl mx-auto">
        {/* Logo / Brand */}
        <Link to="/invoices" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
            📋
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">Invoice Processing</span>
            <span className="text-xs text-slate-500">Work Queue</span>
          </div>
        </Link>

        {/* Navigation / User Section */}
        <div className="flex items-center gap-4">
          <Link
            to="/invoices"
            className="text-sm text-slate-700 hover:text-blue-600 font-medium transition-colors no-underline"
          >
            Queue
          </Link>

          {user && (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-xl transition-colors">
                <Avatar
                  size={32}
                  style={{ backgroundColor: '#1890ff' }}
                >
                  {user.displayName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </Avatar>
                <div className="hidden md:block text-sm leading-tight">
                  <div className="font-medium text-slate-900">{user.displayName}</div>
                </div>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;
