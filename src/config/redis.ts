import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_HOST as string)

try{
    redis.on("connect", function() {
        console.log('Connected to Redis successfully!');
    })
} catch(error){
    console.error('Error connecting to Redis:', error);
}

export { redis }