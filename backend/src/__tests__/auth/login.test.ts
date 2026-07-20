import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('dotenv/config', () => ({}))

const mockDbConfig = vi.hoisted(() => vi.fn())
const mockCreateTokens = vi.hoisted(() => vi.fn())

vi.mock('../../api/dbconnect.js', () => ({ dbConfig: mockDbConfig }))
vi.mock('../../utils/createTokens.js', () => ({ createTokens: mockCreateTokens }))
vi.mock('../../utils/logger.js', () => ({
  default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}))
vi.mock('bcrypt', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
}))

import { app } from '../../app.js'
import '../../api/login.js'
import * as bcrypt from 'bcrypt'

describe('POST /auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when user is not found', async () => {
    mockDbConfig.mockResolvedValue([])

    const res = await app.request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'notfound@test.com', password: 'pw123' }),
    })

    expect(res.status).toBe(401)
    const data = await res.json() as any
    expect(data.success).toBe(false)
    expect(data.message).toBe('Invalid email or password')
  })

  it('returns 401 when password does not match', async () => {
    mockDbConfig.mockResolvedValue([{
      id: 1, email: 'test@test.com', username: 'testuser', password: 'hashed_pw',
    }])
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never)

    const res = await app.request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'wrongpassword' }),
    })

    expect(res.status).toBe(401)
    const data = await res.json() as any
    expect(data.success).toBe(false)
    expect(data.message).toBe('Invalid email or password')
  })

  it('returns 200 with user data and tokens on successful login', async () => {
    mockDbConfig.mockResolvedValue([{
      id: 1, email: 'test@test.com', username: 'testuser', password: 'hashed_pw',
    }])
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never)
    mockCreateTokens.mockResolvedValue({
      accessToken: 'access-token-abc',
      refreshToken: 'refresh-token-xyz',
    })

    const res = await app.request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'correctpassword',
        deviceInfo: 'Android Phone',
      }),
    })

    expect(res.status).toBe(200)
    const data = await res.json() as any
    expect(data.success).toBe(true)
    expect(data.user).toEqual({ id: 1, username: 'testuser', email: 'test@test.com' })
    expect(data.accessToken).toBe('access-token-abc')
    expect(data.refreshToken).toBe('refresh-token-xyz')
  })

  it('compares plain password against stored hash', async () => {
    mockDbConfig.mockResolvedValue([{
      id: 1, email: 'test@test.com', username: 'testuser', password: 'stored_hash',
    }])
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never)
    mockCreateTokens.mockResolvedValue({ accessToken: 'a', refreshToken: 'r' })

    await app.request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'plaintext' }),
    })

    expect(bcrypt.compare).toHaveBeenCalledWith('plaintext', 'stored_hash')
  })

  it('returns 500 on database error', async () => {
    mockDbConfig.mockRejectedValue(new Error('DB error'))

    const res = await app.request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'pw123' }),
    })

    expect(res.status).toBe(500)
    const data = await res.json() as any
    expect(data.success).toBe(false)
  })
})
