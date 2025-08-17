#!/bin/bash

echo "🚀 Setting up environment variables for TableBooking Admin..."

# Generate secure secrets
echo "📝 Generating secure secrets..."
AUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "✅ Generated secrets:"
echo "AUTH_SECRET: $AUTH_SECRET"
echo "NEXTAUTH_SECRET: $NEXTAUTH_SECRET"
echo ""

# Create .env file
echo "📄 Creating .env file..."
cat > .env << EOF
# NextAuth Configuration
AUTH_SECRET=$AUTH_SECRET
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# API Configuration
API_ENDPOINT=http://localhost:3000/api

# AWS Configuration (replace with your actual values)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_IMAGE_BUCKET=your-image-bucket-name

# Application Configuration
NODE_ENV=development
EOF

echo "✅ .env file created successfully!"
echo ""
echo "⚠️  IMPORTANT: Please update the following in your .env file:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - AWS_REGION"
echo "   - AWS_IMAGE_BUCKET"
echo ""
echo "🔧 To run with Docker Compose:"
echo "   docker-compose up --build"
echo ""
echo "🔧 To run with Docker directly:"
echo "   docker build -t tablebooking-admin ."
echo "   docker run -p 3000:3000 -e API_ENDPOINT=http://host.docker.internal:3000/api --env-file .env tablebooking-admin"
