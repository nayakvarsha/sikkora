# Create a new server file
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 Monastery360 Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Monastery360 Backend',
    uptime: process.uptime()
  });
});

// Monasteries API
app.get('/api/monasteries', (req, res) => {
  const monasteries = [
    {
      id: '1',
      name: 'Rumtek Monastery',
      location: 'Rumtek, Sikkim',
      description: 'One of the largest monasteries in Sikkim'
    },
    {
      id: '2',
      name: 'Pemayangtse Monastery', 
      location: 'Pemayangtse, Sikkim',
      description: 'One of the oldest monasteries in Sikkim'
    }
  ];
  res.json(monasteries);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Monastery360 Backend Server Started!');
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://0.0.0.0:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`🏛️  API: http://localhost:${PORT}/api/monasteries`);
});

// Handle errors
app.on('error', (error) => {
  console.error('❌ Server error:', error);
});
EOF