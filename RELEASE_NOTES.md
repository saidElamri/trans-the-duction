# Release Notes

## Version: v1.0.0
**Date:** 2025-11-25

### Changes Summary
- **Backend:** Full FastAPI implementation with JWT authentication and Hugging Face integration.
- **Frontend:** Next.js application with Login/Register and Translate UI.
- **Infrastructure:** Fully Dockerized stack (Backend, Frontend, Nginx, PostgreSQL).
- **Testing:** Postman collection, Newman integration, and Smoke tests.
- **CI/CD:** GitHub Actions workflow for automated testing.

### Known Limitations
- **Hugging Face Rate Limit:** The free Inference API has rate limits.
- **Mock Translation:** CI tests may use mock responses or fail if rate limited.
- **JWT Expiration:** Tokens expire after 1 hour.

### Setup Instructions
See `README.md` for full setup instructions.
