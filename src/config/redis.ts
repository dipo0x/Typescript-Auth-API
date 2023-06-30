import { createClient } from 'redis'

export default async function connectToRedis() {
    try{
        const redis = createClient({ url: process.env.REDIS_HOST })
        await redis.connect()
        console.log('Connected to the Redis successfully!');
        return redis
    }
    catch(error){
        console.error('Error connecting to Redis:', error);
    }

}