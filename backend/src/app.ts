import { Hono } from 'hono'
import { cors } from 'hono/cors'
import "dotenv/config"

export const app = new Hono()

// Enable CORS for all routes
app.use('/*', cors({
  origin: `http://${process.env.IP_ADDRESS}:8081`, // Your frontend URL
  credentials: true,
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})