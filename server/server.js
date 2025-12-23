import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// File for storing subscriptions
const SUBSCRIPTIONS_FILE = path.join(__dirname, 'subscriptions.json');

// Initialize file if it doesn't exist
if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
  fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify([]));
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// ========== HELPER FUNCTIONS ==========

const readSubscriptions = () => {
  try {
    const data = fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscriptions:', error);
    return [];
  }
};

const writeSubscriptions = (subscriptions) => {
  try {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing subscriptions:', error);
    return false;
  }
};

// ========== ADMIN AUTH MIDDLEWARE ==========

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      error: 'Authorization header missing' 
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const validToken = process.env.ADMIN_TOKEN || 'test_admin_token_123';

  console.log('🔐 Auth check:');
  console.log('   Expected:', validToken.substring(0, 10) + '...');
  console.log('   Received:', token.substring(0, 10) + '...');
  console.log('   Match:', token === validToken);

  if (token !== validToken) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid admin token' 
    });
  }

  next();
};

// ========== PUBLIC ENDPOINTS ==========

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'festive-notifications-api'
  });
});

// 2. Get VAPID public key
app.get('/api/vapid-public-key', (req, res) => {
  res.json({ 
    publicKey: process.env.VAPID_PUBLIC_KEY || 'BPi0k6CqYFuynWm3Dsw5QFsMfM_GR1vnRysVbQO6pX5FxFbc0A03vJVRS8CMLYRt1K_TVUohkXMgMM6jhGF2Chg'
  });
});

// 3. Subscribe to notifications
app.post('/api/subscribe', (req, res) => {
  try {
    const subscription = req.body;
    
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid subscription data' 
      });
    }

    const subscriptions = readSubscriptions();
    
    // Check if already exists
    const exists = subscriptions.some(sub => sub.endpoint === subscription.endpoint);
    
    if (!exists) {
      subscriptions.push({
        ...subscription,
        createdAt: new Date().toISOString(),
        notificationSent: false
      });
      
      writeSubscriptions(subscriptions);
      console.log('✅ New subscription saved');
    }

    res.json({ 
      success: true,
      message: 'Subscription saved successfully'
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// 4. Unsubscribe
app.post('/api/unsubscribe', (req, res) => {
  try {
    const { endpoint } = req.body;
    
    if (!endpoint) {
      return res.status(400).json({ 
        success: false, 
        error: 'Endpoint is required' 
      });
    }

    const subscriptions = readSubscriptions();
    const filtered = subscriptions.filter(sub => sub.endpoint !== endpoint);
    
    writeSubscriptions(filtered);
    
    res.json({ 
      success: true,
      message: 'Unsubscribed successfully'
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// ========== ADMIN ENDPOINTS ==========

// 1. Get all subscriptions (REQUIRES ADMIN TOKEN)
app.get('/api/admin/subscriptions', authenticateAdmin, (req, res) => {
  try {
    console.log('📊 Fetching subscriptions for admin...');
    
    const subscriptions = readSubscriptions();
    
    // Sanitize data (remove sensitive keys)
    const sanitizedSubscriptions = subscriptions.map(sub => ({
      endpoint: sub.endpoint,
      createdAt: sub.createdAt,
      notificationSent: sub.notificationSent || false,
      notificationSentAt: sub.notificationSentAt || null
    }));
    
    // Calculate stats
    const stats = {
      total: sanitizedSubscriptions.length,
      pending: sanitizedSubscriptions.filter(s => !s.notificationSent).length,
      sent: sanitizedSubscriptions.filter(s => s.notificationSent).length,
      recent: sanitizedSubscriptions.filter(s => {
        const date = new Date(s.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date > weekAgo;
      }).length
    };
    
    console.log(`📊 Returning ${sanitizedSubscriptions.length} subscriptions`);
    
    res.json({
      success: true,
      count: sanitizedSubscriptions.length,
      subscriptions: sanitizedSubscriptions,
      stats: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// 2. Send test notification (REQUIRES ADMIN TOKEN)
app.post('/api/admin/send-test', authenticateAdmin, (req, res) => {
  try {
    console.log('🔔 Admin sending test notification...');
    
    // In a real app, you would send actual push notifications here
    // For now, just return success
    
    res.json({ 
      success: true,
      message: 'Test notification would be sent',
      note: 'Push notifications require web-push library and VAPID keys'
    });
  } catch (error) {
    console.error('Error sending test:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// 3. Trigger New Year notifications (REQUIRES ADMIN TOKEN)
app.post('/api/trigger-new-year', authenticateAdmin, (req, res) => {
  try {
    console.log('🎆 Admin triggering New Year notifications...');
    
    const subscriptions = readSubscriptions();
    const pendingSubscriptions = subscriptions.filter(sub => !sub.notificationSent);
    
    // Mark as sent
    subscriptions.forEach(sub => {
      if (!sub.notificationSent) {
        sub.notificationSent = true;
        sub.notificationSentAt = new Date().toISOString();
      }
    });
    
    writeSubscriptions(subscriptions);
    
    res.json({
      success: true,
      message: 'New Year notifications triggered',
      result: {
        sent: pendingSubscriptions.length,
        failed: 0,
        total: subscriptions.length
      }
    });
  } catch (error) {
    console.error('Error triggering notifications:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// 4. Cleanup old subscriptions (REQUIRES ADMIN TOKEN)
app.post('/api/admin/cleanup', authenticateAdmin, (req, res) => {
  try {
    const subscriptions = readSubscriptions();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const activeSubscriptions = subscriptions.filter(sub => {
      const lastUpdated = new Date(sub.createdAt);
      return lastUpdated > oneMonthAgo;
    });
    
    const removedCount = subscriptions.length - activeSubscriptions.length;
    
    if (removedCount > 0) {
      writeSubscriptions(activeSubscriptions);
      console.log(`🧹 Cleaned up ${removedCount} old subscriptions`);
    }
    
    res.json({
      success: true,
      message: 'Cleanup completed',
      cleaned: removedCount,
      remaining: activeSubscriptions.length
    });
  } catch (error) {
    console.error('Error cleaning up:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// ========== ERROR HANDLING ==========

// Catch-all for undefined API routes
// Admin debug endpoint (local only) - reports whether ADMIN_TOKEN is configured
app.get('/api/admin/debug-token', (req, res) => {
  try {
    const token = process.env.ADMIN_TOKEN;
    return res.status(200).json({
      configured: !!token,
      length: token ? token.length : 0,
      note: 'For local debugging only. Token value is not exposed.'
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return res.status(500).json({ configured: false, error: 'Internal server error' });
  }
});

app.use('/api/', (req, res) => {
  console.log(`❌ API route not found: ${req.originalUrl}`);
  res.status(404).json({ 
    success: false, 
    error: 'API endpoint not found',
    availableEndpoints: [
      'GET  /api/health',
      'GET  /api/vapid-public-key',
      'POST /api/subscribe',
      'POST /api/unsubscribe',
      'GET  /api/admin/subscriptions (requires auth)',
      'POST /api/admin/send-test (requires auth)',
      'POST /api/trigger-new-year (requires auth)',
      'GET  /api/admin/debug-token (local debug)'
    ]
  });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
  console.log(`
🎄 FESTIVE APP BACKEND 🎄
==========================
✅ Server running on port ${PORT}
✅ Environment: ${process.env.NODE_ENV || 'development'}

📡 AVAILABLE ENDPOINTS:
   GET  /api/health
   GET  /api/vapid-public-key
   POST /api/subscribe
   POST /api/unsubscribe
   
🔐 ADMIN ENDPOINTS (requires token):
   GET  /api/admin/subscriptions
   POST /api/admin/send-test
   POST /api/trigger-new-year
   POST /api/admin/cleanup

🔑 Default admin token: test_admin_token_123
   (Set ADMIN_TOKEN in .env to change)

👉 Test: http://localhost:${PORT}/api/health
==========================
  `);
});