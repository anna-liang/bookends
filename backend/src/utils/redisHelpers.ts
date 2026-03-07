import { redisClient } from "../redisClient.ts"

export const getOrSetCache = async <T>(key: string, callback: () => Promise<T>, expiration?: number): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await redisClient.get(key)
            console.log('cache hit', data)
            if (data !== null) return resolve(JSON.parse(data))
        } catch (error) {
            return reject(error)
        }
        const freshData = await callback()
        console.log('cache miss')
        redisClient.setEx(key, expiration || 6000, JSON.stringify(freshData))
        return resolve(freshData)
    })
}