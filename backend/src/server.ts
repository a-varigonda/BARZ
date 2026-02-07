import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

console.log("🔥 SERVER STARTED");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

console.log('Mounting /api/auth');

// 🔥 DEBUG IMPORT BLOCK
try {
  const authRoutes = require('./routes/authRoutes').default;
  console.log("✅ AUTH ROUTER IMPORTED SUCCESS");
  app.use('/api/auth', authRoutes);
} catch (err) {
  console.error("❌ AUTH ROUTER IMPORT FAILED");
  console.error(err);
}

app.get('/api/health', (_req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get('/', (_req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


