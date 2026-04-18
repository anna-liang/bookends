import { redisClient } from "../redisClient.ts"

export const getOrSetCache = async <T>(key: string, callback: () => Promise<T>, expiration?: number): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await redisClient.get(key)
            if (data !== null) return resolve(JSON.parse(data))
        } catch (error) {
            return reject(error)
        }
        const freshData = await callback()
        redisClient.setEx(key, expiration || 6000, JSON.stringify(freshData))
        return resolve(freshData)
    })
}