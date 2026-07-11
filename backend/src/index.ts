import { serve } from '@hono/node-server'
import { app } from './app.js'
import "./api/createAccount.js"
import "./api/login.js"
import "./api/logout.js"
import "./api/refresh.js"
import "dotenv/config"

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: "0.0.0.0"
}, (info) => {
  console.log(`Server is running on http://${process.env.IP_ADDRESS}:${info.port}`)
})
