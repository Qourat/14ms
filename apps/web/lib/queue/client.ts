import { Queue } from 'bullmq'
import { Redis } from 'ioredis'

let redis: Redis | null = null
let downloadQueue: Queue | null = null
let uploadQueue: Queue | null = null

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL!)
  }
  return redis
}

export function getDownloadQueue(): Queue {
  if (!downloadQueue) {
    downloadQueue = new Queue('download', { connection: getRedisClient() })
  }
  return downloadQueue
}

export function getUploadQueue(): Queue {
  if (!uploadQueue) {
    uploadQueue = new Queue('upload', { connection: getRedisClient() })
  }
  return uploadQueue
}

