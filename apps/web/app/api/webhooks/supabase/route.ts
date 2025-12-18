import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await request.json()

    // Verify webhook secret if needed
    const secret = request.headers.get('x-supabase-secret')
    if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Handle different webhook events
    const { type, table, record } = body

    switch (type) {
      case 'INSERT':
        if (table === 'jobs') {
          // Handle new job creation
          console.log('New job created:', record.id)
        }
        break
      case 'UPDATE':
        if (table === 'jobs') {
          // Handle job status updates
          console.log('Job updated:', record.id, record.status)
        }
        break
      default:
        console.log('Unhandled webhook type:', type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

