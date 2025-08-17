# Environment Setup Guide

This guide will help you set up the environment variables needed for the TableBooking Admin application.

## Quick Setup

1. **Run the setup script** (recommended):
   ```bash
   ./setup-env.sh
   ```

2. **Update AWS credentials** in the generated `.env` file:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_IMAGE_BUCKET`

## Manual Setup

If you prefer to set up manually, create a `.env` file in the root directory with the following variables:

```env
# NextAuth Configuration
AUTH_SECRET=your-auth-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# API Configuration
API_ENDPOINT=http://localhost:3000/api

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_IMAGE_BUCKET=your-image-bucket-name

# Application Configuration
NODE_ENV=development
```

## Generating Secure Secrets

To generate secure secrets for NextAuth:

```bash
# Generate AUTH_SECRET
openssl rand -base64 32

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

## Running with Docker

### Option 1: Using Docker Compose (Recommended)
```bash
docker-compose up --build
```

### Option 2: Using Docker directly
```bash
# Build the image
docker build -t tablebooking-admin .

# Run with environment file and correct API endpoint for Docker
docker run -p 3000:3000 -e API_ENDPOINT=http://host.docker.internal:3000/api --env-file .env tablebooking-admin
```

### Option 3: Using environment variables directly
```bash
docker run -p 3000:3000 \
  -e API_ENDPOINT=http://localhost:3000/api \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=your-secret \
  -e AUTH_SECRET=your-secret \
  tablebooking-admin
```

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `API_ENDPOINT` | Base URL for API calls | Yes | - |
| `NEXTAUTH_URL` | URL for NextAuth.js | Yes | - |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes | - |
| `AUTH_SECRET` | Secret for authentication | Yes | - |
| `AWS_ACCESS_KEY_ID` | AWS Access Key | Yes | - |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Key | Yes | - |
| `AWS_REGION` | AWS Region | Yes | us-east-1 |
| `AWS_IMAGE_BUCKET` | S3 Bucket for images | Yes | - |
| `NODE_ENV` | Node environment | No | development |
| `PORT` | Port to run on | No | 3000 |
| `HOSTNAME` | Host to bind to | No | 0.0.0.0 |

## Troubleshooting

### "UntrustedHost" Error
This error occurs when NextAuth.js doesn't trust the host URL. The `trustHost: true` option has been added to the auth configuration to resolve this.

### "Failed to parse URL from undefined" Error
This error occurs when `API_ENDPOINT` is not set. Make sure your `.env` file contains the `API_ENDPOINT` variable.

### Environment Variables Not Loading
1. Check that your `.env` file is in the root directory
2. Verify the file format (no spaces around `=`)
3. Restart your application after making changes
4. For Docker, rebuild the image after changing environment variables

### Docker API Calls Not Working
If API calls fail when running in Docker:
1. **Use `host.docker.internal`**: Set `API_ENDPOINT=http://host.docker.internal:3000/api` for Docker
2. **Use Docker Compose**: The docker-compose.yml is already configured correctly
3. **Alternative**: Use `--network="host"` flag: `docker run --network="host" tablebooking-admin`
4. **Check backend**: Ensure your backend is running on port 3000 on the host machine

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Rotate AWS credentials regularly
- Use environment-specific configurations for different deployment stages
