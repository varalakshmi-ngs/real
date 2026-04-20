# Real Temple Project

A full-stack web application for Real Temple with admin panel, backend API, and frontend.

## Architecture

- **Frontend**: Next.js application
- **Backend**: Node.js/Express API with MySQL and Redis
- **Admin**: React admin panel

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- MySQL 8.0
- Redis

## Environment Setup

1. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp admin/.env.example admin/.env
   ```

2. Update environment variables with production values:
   - Database credentials
   - JWT secrets
   - API keys (Razorpay, Google, YouTube)
   - CORS origins

## Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

## Production Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access:
   - Frontend: http://localhost:3000
   - Admin: http://localhost:4042
   - Backend API: http://localhost:4040

## Database Setup

The MySQL container will automatically initialize with `backend/schema.sql`.

For admin user, run:
```bash
cd backend
node seed-admin.js
```

## Security Notes

- Never commit `.env` files
- Use strong passwords and secrets
- Enable HTTPS in production
- Regularly update dependencies

## Monitoring

- Health check: GET /health
- Logs: Check Docker logs
- Rate limiting: 100 requests per 15 minutes per IP

## API Documentation

[Add Swagger/OpenAPI link here]

## Contributing

1. Run linting: `npm run lint`
2. Run tests: `npm test`
3. Follow ESLint rules