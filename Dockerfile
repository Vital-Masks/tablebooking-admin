# Build stage
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

# Install build dependencies and yarn
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    yarn

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN yarn build

# Production stage
FROM public.ecr.aws/docker/library/node:20-alpine AS runner

# Install yarn
RUN apk add --no-cache yarn

# Set working directory
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy environment file if it exists
COPY .env* ./

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV="production"

# Start the application
CMD ["node", "server.js"]
