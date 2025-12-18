import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')

export const captionSchema = z
  .string()
  .max(2200, 'Caption must be less than 2200 characters')

