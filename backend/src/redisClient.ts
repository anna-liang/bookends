import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('error', (err) => console.error('Redis Error:', err));

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('Connected to Redis');
    }
};

export { redisClient }