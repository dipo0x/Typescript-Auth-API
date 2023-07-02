import { redis } from "../config/redis";

const repository = {
    async createData(key: string, value: number){
        await redis.set(key, value)
    },
    async getValue(key: string) {
        const data = await redis.get(key)
        return data
    }
}

export default repository