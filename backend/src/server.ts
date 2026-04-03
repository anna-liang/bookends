import 'dotenv/config';
import app from './app.ts';
import { connectRedis } from './redisClient.ts';

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectRedis()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
