const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

const app = express();

// Connect DB
connectDB();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
origin: [
'http://localhost:3000',
'https://bonthewad-dattu-hey-stranger-33o4.vercel.app'
],
credentials: true
}));

// Middleware
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/social', require('./routes/social'));
app.use('/api/users', require('./routes/users'));
app.use('/api/saved', require('./routes/saved'));
app.use('/api/memories', require('./routes/memories'));
app.use('/api/friends', require('./routes/friends'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/events', require('./routes/events'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/watch', require('./routes/watch'));

// Test route
app.get('/', (req, res) => {
res.send('API is running...');
});

// ✅ Serve frontend (only if hosting together — safe to keep)
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});
}

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
