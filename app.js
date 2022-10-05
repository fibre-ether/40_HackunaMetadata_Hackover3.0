import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import db from './config/db.js'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import eventRouter from './routes/events.js'
import paymentRouter from './routes/payment.js'
import cors from 'cors'

const port = process.env.PORT || 3001
const app = express()
await db()

app.use(morgan(':method :url :status :response-time ms'))
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/event', eventRouter)
app.use('/api/v1/', paymentRouter)



const server = app.listen(port, () =>
  console.log(`server has started on port ${port}`)
)

export default server