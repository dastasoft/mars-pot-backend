import 'dotenv/config'

import createApp from './lib/createApp'
import connectDB from './lib/db'

const PORT = process.env.PORT || 3001

connectDB()
const app = createApp()
app.listen(PORT)
console.log(`🚀 Server Live: http://localhost:${PORT}`)
