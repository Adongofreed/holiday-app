import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Check for saved token on load
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchStats(savedToken);
    }
  }, []);

  const fetchStats = async (authToken) => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/subscriptions', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid token');
        }
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (error) {
      showMessage(error.message, 'error');
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      showMessage('Please enter admin token', 'error');
      return;
    }

    try {
      setLoading(true);
      // Test the token by making a simple request
      const response = await fetch('/api/admin/subscriptions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid admin token');
        }
        throw new Error('Authentication failed');
      }
      
      localStorage.setItem('adminToken', token);
      setIsLoggedIn(true);
      fetchStats(token);
      showMessage('Login successful!', 'success');
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setToken('');
    setStats(null);
    showMessage('Logged out successfully', 'info');
  };

  const sendTestNotification = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/send-test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Test notification from admin panel' })
      });
      
      if (!response.ok) throw new Error('Failed to send test');
      
      showMessage('Test notification sent successfully!', 'success');
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const triggerNewYearNotifications = async () => {
    if (!window.confirm('Send New Year notifications to ALL subscribers? This will send actual push notifications.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/trigger-new-year', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to trigger notifications');
      
      const data = await response.json();
      showMessage(`Notifications sent! ${data.result?.sent || 0} successful.`, 'success');
      fetchStats(token); // Refresh stats
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const styles = {
    adminPage: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f5f7',
      display: 'block',
      fontSize: '16px',
      lineHeight: '1.5'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1d1d1f',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d2d2d7',
      borderRadius: '8px',
      fontSize: '16px',
      marginBottom: '16px',
      boxSizing: 'border-box'
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#007aff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonDanger: {
      backgroundColor: '#ff3b30'
    },
    buttonSecondary: {
      backgroundColor: '#8e8e93'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    messageSuccess: {
      backgroundColor: '#d4f7e2',
      color: '#2e7d32',
      border: '1px solid #a5d6a7'
    },
    messageError: {
      backgroundColor: '#ffebee',
      color: '#c62828',
      border: '1px solid #ef9a9a'
    },
    messageInfo: {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
      border: '1px solid #90caf9'
    },
    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    statLabel: {
      color: '#666',
      fontSize: '14px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px'
    },
    tableHeader: {
      backgroundColor: '#f5f5f7',
      padding: '12px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#666',
      borderBottom: '1px solid #e0e0e0'
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '14px'
    },
    badge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    badgeSuccess: {
      backgroundColor: '#d4f7e2',
      color: '#2e7d32'
    },
    badgeWarning: {
      backgroundColor: '#fff3e0',
      color: '#ef6c00'
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div style={styles.adminPage}>
        <style>{`
          button:hover { opacity: 0.9; }
          input:focus { outline: none; border-color: #007aff; box-shadow: 0 0 0 3px rgba(0,122,255,0.1); }
          .loading { animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px'
        }}>
          <div style={{...styles.card, maxWidth: '400px', width: '100%'}}>
            <h2 style={styles.title}>🔐 Admin Login</h2>
            
            {message.text && (
              <div style={{
                ...styles.message,
                ...(message.type === 'success' ? styles.messageSuccess : 
                    message.type === 'error' ? styles.messageError : styles.messageInfo)
              }}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Admin Token
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={styles.input}
                  placeholder="Enter admin token from .env file"
                  disabled={loading}
                />
                <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                  Find this in: <code>server/.env</code> → <code>ADMIN_TOKEN=</code>
                </p>
              </div>
              
              <button 
                type="submit" 
                style={styles.button}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', marginRight: '8px', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                    Authenticating...
                  </>
                ) : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={styles.adminPage}>
      <style>{`
        button:hover { opacity: 0.9; }
        tr:hover { background-color: #f9f9f9; }
        .loading { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: 1fr; }
          .table-responsive { overflow-x: auto; }
        }
      `}</style>
      
      <div style={styles.container}>
        {/* Header */}
        <div style={{...styles.card, marginBottom: '20px'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1d1d1f', margin: '0 0 8px 0' }}>
                🎄 Festive Admin Dashboard
              </h1>
              <p style={{ color: '#666', margin: 0 }}>
                Manage notifications and subscribers
              </p>
            </div>
            <button 
              onClick={handleLogout}
              style={{...styles.button, ...styles.buttonSecondary}}
              disabled={loading}
            >
              Logout
            </button>
          </div>
          
          {message.text && (
            <div style={{
              ...styles.message,
              ...(message.type === 'success' ? styles.messageSuccess : 
                  message.type === 'error' ? styles.messageError : styles.messageInfo),
              marginTop: '20px'
            }}>
              {message.text}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={styles.statGrid} className="stat-grid">
          <div style={styles.statCard}>
            <div style={{...styles.statNumber, color: '#007aff'}}>
              {stats?.count || 0}
            </div>
            <div style={styles.statLabel}>Total Subscribers</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{...styles.statNumber, color: '#34c759'}}>
              {stats?.stats?.sent || 0}
            </div>
            <div style={styles.statLabel}>Notifications Sent</div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{...styles.statNumber, color: '#ff9500'}}>
              {stats?.stats?.pending || 0}
            </div>
            <div style={styles.statLabel}>Pending Notifications</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{...styles.card, marginBottom: '20px'}}>
          <h2 style={styles.title}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={sendTestNotification}
              style={styles.button}
              disabled={loading}
            >
              🔔 Send Test Notification
            </button>
            
            <button 
              onClick={triggerNewYearNotifications}
              style={{...styles.button, ...styles.buttonDanger}}
              disabled={loading}
            >
              🎆 Trigger New Year Notifications
            </button>
          </div>
        </div>

        {/* Subscribers Table */}
        {stats?.subscriptions && stats.subscriptions.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.title}>📋 Subscribers ({stats.subscriptions.length})</h2>
            <div className="table-responsive">
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Endpoint</th>
                    <th style={styles.tableHeader}>Subscribed On</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.subscriptions.slice(0, 10).map((sub, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>
                        <code style={{ 
                          fontFamily: 'monospace', 
                          fontSize: '12px',
                          backgroundColor: '#f5f5f7',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          {sub.endpoint.substring(0, 50)}...
                        </code>
                      </td>
                      <td style={styles.tableCell}>
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.badge,
                          ...(sub.notificationSent ? styles.badgeSuccess : styles.badgeWarning)
                        }}>
                          {sub.notificationSent ? 'Sent ✓' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {stats.subscriptions.length > 10 && (
              <p style={{ color: '#666', fontSize: '14px', marginTop: '16px', textAlign: 'center' }}>
                Showing 10 of {stats.subscriptions.length} subscribers
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0,122,255,0.3)',
              borderTopColor: '#007aff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '16px'
            }}></div>
            <p style={{ color: '#666' }}>Processing...</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', color: '#8e8e93', fontSize: '14px', padding: '20px' }}>
          <p>Backend: http://localhost:5000 • Admin Panel v1.0</p>
          <p>Token: {token.substring(0, 20)}...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;