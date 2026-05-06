/**
 * Main App Component
 * Configures routing and layout for the entire application
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppHeader from './components/AppHeader';
import Login from './pages/Login';
import Home from './pages/Home';
import InvoiceDetail from './pages/InvoiceDetail';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout
                  style={{ minHeight: '100vh' }}
                  className="bg-gray-50"
                >
                  <AppHeader />

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/invoices" element={<Home />} />
                    <Route path="/invoice/:id" element={<InvoiceDetail />} />
                    <Route path="*" element={<Navigate to="/invoices" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
