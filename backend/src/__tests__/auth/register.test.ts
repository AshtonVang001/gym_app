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
import '../../api/createAccount.js'
import * as bcrypt from 'bcrypt'

describe('POST /auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 when username is empty', async () => {
    const res = await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: '  ', email: 'test@test.com', password: 'pw123' }),
    })
    expect(res.status).toBe(400)
    const data = await res.json() as any
    expect(data.success).toBe(false)
    expect(data.message).toBe('Username, email, and password are required.')
  })

  it('returns 400 when email is missing', async () => {
    const res = await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', email: '', password: 'pw123' }),
    })
    expect(res.status).toBe(400)
    const data = await res.json() as any
    expect(data.success).toBe(false)
  })

  it('returns 400 when password is missing', async () => {
    const res = await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', email: 'test@test.com', password: '' }),
    })
    expect(res.status).toBe(400)
    const data = await res.json() as any
    expect(data.success).toBe(false)
  })

  it('returns 201 with user data and tokens on success', async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never)
    mockDbConfig.mockResolvedValue([{
      id: 1,
      username: 'testuser',
      email: 'test@test.com',
      role: 'user',
      created_at: new Date(),
    }])
    mockCreateTokens.mockResolvedValue({
      accessToken: 'access-token-123',
      refreshToken: 'refresh-token-456',
    })

    const res = await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
        deviceInfo: 'iPhone 15',
      }),
    })

    expect(res.status).toBe(201)
    const data = await res.json() as any
    expect(data.success).toBe(true)
    expect(data.user).toEqual({ id: 1, username: 'testuser', email: 'test@test.com' })
    expect(data.accessToken).toBe('access-token-123')
    expect(data.refreshToken).toBe('refresh-token-456')
  })

  it('hashes the password before storing', async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never)
    mockDbConfig.mockResolvedValue([{
      id: 1, username: 'testuser', email: 'test@test.com', role: 'user', created_at: new Date(),
    }])
    mockCreateTokens.mockResolvedValue({ accessToken: 'a', refreshToken: 'r' })

    await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', email: 'test@test.com', password: 'password123' }),
    })

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
  })

  it('returns 500 on database error', async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never)
    mockDbConfig.mockRejectedValue(new Error('DB connection failed'))

    const res = await app.request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', email: 'test@test.com', password: 'password123' }),
    })

    expect(res.status).toBe(500)
    const data = await res.json() as any
    expect(data.success).toBe(false)
  })
})
