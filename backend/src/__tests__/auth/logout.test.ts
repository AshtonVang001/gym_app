import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('dotenv/config', () => ({}))

const mockDbConfig = vi.hoisted(() => vi.fn())

vi.mock('../../api/dbconnect.js', () => ({ dbConfig: mockDbConfig }))
vi.mock('../../utils/logger.js', () => ({
  default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}))

import { app } from '../../app.js'
import '../../api/logout.js'

describe('POST /auth/logout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 when no refresh token is provided', async () => {
    const res = await app.request('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    expect(res.status).toBe(400)
    const data = await res.json() as any
    expect(data.success).toBe(false)
    expect(data.message).toBe('No token provided')
  })

  it('returns 200 on successful logout', async () => {
    mockDbConfig.mockResolvedValue([])

    const res = await app.request('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'valid-refresh-token' }),
    })

    expect(res.status).toBe(200)
    const data = await res.json() as any
    expect(data.success).toBe(true)
    expect(data.message).toBe('Logged out successfully')
  })

  it('deletes the token from the database', async () => {
    mockDbConfig.mockResolvedValue([])

    await app.request('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'some-token' }),
    })

    expect(mockDbConfig).toHaveBeenCalledTimes(1)
  })

  it('returns 500 on database error', async () => {
    mockDbConfig.mockRejectedValue(new Error('DB error'))

    const res = await app.request('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'some-token' }),
    })

    expect(res.status).toBe(500)
    const data = await res.json() as any
    expect(data.success).toBe(false)
  })
})
