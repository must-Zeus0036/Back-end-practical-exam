import express from 'express'
import logger from 'morgan'
import { router } from './route.js'

export const app = express()

// Enable the HTTP request logger
app.use(logger('dev'))

// Middleware to parse JSON data as part of the body
app.use(express.json())

// Mount the routes
app.use('/', router)

// Error handler for 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Global errorhandler
app.use((err, req, res, next) => {
  const status = err.status || 500
  console.error(err)
  res.status(status).json({
    status,
    message: err.message
  })
})
