import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('dotenv/config', () => ({}))
vi.mock('hono/jwt', () => ({
  sign: vi.fn().mockResolvedValue('new-access-token'),
  verify: vi.fn(),
}))

const mockDbConfig = vi.hoisted(() => vi.fn())

vi.mock('../../api/dbconnect.js', () => ({ dbConfig: mockDbConfig }))
vi.mock('../../utils/logger.js', () => ({
  default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}))

import { app } from '../../app.js'
import '../../api/refresh.js'
import { sign } from 'hono/jwt'

describe('POST /auth/refresh', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(sign).mockResolvedValue('new-access-token')
  })

  it('returns 400 when no refresh token is provided', async () => {
    const res = await app.request('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    expect(res.status).toBe(400)
    const data = await res.json() as any
    expect(data.success).toBe(false)
    expect(data.message).toBe('No token provided')
  })

  it('returns 401 when refresh token is not found or expired', async () => {
    mockDbConfig.mockResolvedValue([])

    const res = await app.request('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'invalid-token' }),
    })

    expect(res.status).toBe(401)
    const data = await res.json() as any
    expect(data.success).toBe(false)
    expect(data.message).toBe('Invalid token')
  })

  it('returns 200 with new access and refresh tokens on success', async () => {
    mockDbConfig
      .mockResolvedValueOnce([{ user_id: 1, family_id: 'family-uuid-123' }]) // find token
      .mockResolvedValueOnce([{ id: 1, username: 'testuser', role: 'user' }])  // find user
      .mockResolvedValueOnce([])                                                // revoke old token
      .mockResolvedValueOnce([])                                                // insert new token

    const res = await app.request('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'valid-refresh-token', deviceInfo: 'iPhone 15' }),
    })

    expect(res.status).toBe(200)
    const data = await res.json() as any
    expect(data.success).toBe(true)
    expect(data.accessToken).toBe('new-access-token')
    expect(data.refreshToken).toBeTruthy()
    expect(data.user).toEqual({ id: 1, username: 'testuser' })
  })

  it('revokes the old token and issues a new one', async () => {
    mockDbConfig
      .mockResolvedValueOnce([{ user_id: 1, family_id: 'fam-id' }])
      .mockResolvedValueOnce([{ id: 1, username: 'testuser', role: 'user' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])

    await app.request('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'some-token' }),
    })

    // 4 DB calls: find token, find user, revoke, insert new
    expect(mockDbConfig).toHaveBeenCalledTimes(4)
  })

  it('returns 500 on database error', async () => {
    mockDbConfig.mockRejectedValue(new Error('DB error'))

    const res = await app.request('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: 'some-token' }),
    })

    expect(res.status).toBe(500)
    const data = await res.json() as any
    expect(data.success).toBe(false)
  })
})
