import { Worker } from 'bullmq'
import { Redis } from 'ioredis'
import { downloadProcessor } from './processors/download.processor'
import { processProcessor } from './processors/process.processor'
import { uploadProcessor } from './processors/upload.processor'

const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // Required for BullMQ
})

console.log('Starting worker service...')

// Download worker
const downloadWorker = new Worker('download', downloadProcessor, {
  connection: redis,
  concurrency: 3,
})

downloadWorker.on('completed', (job) => {
  console.log(`Download job ${job.id} completed`)
})

downloadWorker.on('failed', (job, error) => {
  console.error(`Download job ${job?.id} failed:`, error)
})

// Process worker (AI processing)
const processWorker = new Worker('process', processProcessor, {
  connection: redis,
  concurrency: 2,
})

processWorker.on('completed', (job) => {
  console.log(`Process job ${job.id} completed`)
})

processWorker.on('failed', (job, error) => {
  console.error(`Process job ${job?.id} failed:`, error)
})

// Upload worker
const uploadWorker = new Worker('upload', uploadProcessor, {
  connection: redis,
  concurrency: 2,
})

uploadWorker.on('completed', (job) => {
  console.log(`Upload job ${job.id} completed`)
})

uploadWorker.on('failed', (job, error) => {
  console.error(`Upload job ${job?.id} failed:`, error)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down workers...')
  await downloadWorker.close()
  await processWorker.close()
  await uploadWorker.close()
  await redis.quit()
  process.exit(0)
})

