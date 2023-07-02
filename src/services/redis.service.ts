import { redis } from "../config/redis";

const TEMP_LOCK_EXPIRY_TIME = 900

const repository = {
    async createTempLock(key: string, value?: number){
        key = key + "tempLock"
        const data = await redis.get(key)
        if(data){
            const chancesLeft = parseInt(data) - 1
            await redis.set(key, chancesLeft)
            redis.expire(key, TEMP_LOCK_EXPIRY_TIME)
            return chancesLeft
        }
        await redis.set(key, 3)
        redis.expire(key, TEMP_LOCK_EXPIRY_TIME)
        return 3
    },
    async getValue(key: string): Promise<number | null> {
        key = key + "tempLock"
        const data = await redis.get(key)
        return data !== null ? parseInt(data) : null;
    }
}

export default repository