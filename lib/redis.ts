import {Redis, RedisOptions} from 'ioredis'

const redisOptions : RedisOptions = {
    host : process.env.REDIS_HOST || 'localhost',
    port : Number(process.env.REDIS_PORT) || 6379,
    db : 0,
    lazyConnect : true,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
}

const redis = new Redis(redisOptions)

redis.on('connect', () => console.log('Redis connected - ✅'))
redis.on('error', (err) => console.log('Redis connection error ❌ ', err))
redis.on('close', () => console.log('Redis colsed 🔻'))

export {redis}