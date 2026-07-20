import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('dotenv/config', () => ({}))
vi.mock('hono/jwt', () => ({
  sign: vi.fn().mockResolvedValue('mock-access-token'),
}))

const mockDbConfig = vi.hoisted(() => vi.fn())
vi.mock('../../api/dbconnect.js', () => ({ dbConfig: mockDbConfig }))

import { createTokens } from '../../utils/createTokens.js'
import { sign } from 'hono/jwt'

const mockUser = [{ id: 1, username: 'testuser', role: 'user' }] as any

describe('createTokens', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(sign).mockResolvedValue('mock-access-token')
    mockDbConfig.mockResolvedValue([{}])
  })

  it('returns an access token and refresh token', async () => {
    const result = await createTokens(mockUser, 'test-device')
    expect(result.accessToken).toBe('mock-access-token')
    expect(result.refreshToken).toBeTruthy()
    expect(typeof result.refreshToken).toBe('string')
  })

  it('signs access token with correct payload', async () => {
    await createTokens(mockUser, 'test-device')
    expect(sign).toHaveBeenCalledWith(
      expect.objectContaining({ sub: 'testuser', role: 'user' }),
      process.env.ACCESS_SECRET,
    )
  })

  it('stores refresh token hash in database', async () => {
    await createTokens(mockUser, 'mobile-ios')
    expect(mockDbConfig).toHaveBeenCalledTimes(1)
  })

  it('generates unique refresh tokens on each call', async () => {
    const result1 = await createTokens(mockUser, 'device-1')
    const result2 = await createTokens(mockUser, 'device-2')
    expect(result1.refreshToken).not.toBe(result2.refreshToken)
  })
})
