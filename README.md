# TalAIt - Translation App

A fullstack translation application using Next.js, FastAPI, PostgreSQL, and Hugging Face Inference API.

## 🚀 Final Developer Guide

### How to run full stack
```bash
./scripts/docker_frontend_start.sh
```
Access the application at [http://localhost](http://localhost).

### How to test everything
```bash
./scripts/run_postman.sh
./scripts/smoke_tests.sh
```

### API Flow
1. **Register**: Create a new user account.
2. **Login**: Authenticate and receive a JWT token.
3. **Translate**: Use the token to access the translation endpoint.

### Environments
Ensure your `.env` file is configured (see `.env.example`).
- `NEXT_PUBLIC_API_URL`: URL for the backend API (via proxy).
- `JWT_SECRET`: Secret key for JWT signing.
- `HF_TOKEN`: Hugging Face API token.

### Project Architecture
- **Frontend**: Next.js (React)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Proxy**: Nginx
- **AI Service**: Hugging Face Inference API

## 📦 Production Handover Instructions

### Start Full Stack
```bash
./scripts/docker_frontend_start.sh
```

### Run Smoke Tests
```bash
./scripts/smoke_tests.sh
./scripts/run_postman.sh
```

### Access Points
- **Frontend:** [http://localhost](http://localhost) (via Nginx)
- **Backend Docs:** [http://localhost/api/docs](http://localhost/api/docs)

### Stopping Services
```bash
docker-compose -f docker-compose.yml -f docker-compose.frontend.override.yml down -v
```
