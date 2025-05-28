# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/intake/package.json ./apps/intake/
COPY packages/shared-host/package.json ./packages/shared-host/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build --filter=intake

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/apps/intake/next.config.js ./
COPY --from=builder /app/apps/intake/public ./public
COPY --from=builder /app/apps/intake/.next/standalone ./
COPY --from=builder /app/apps/intake/.next/static ./apps/intake/.next/static

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3002

# Expose port
EXPOSE 3002

# Start the application
CMD ["node", "apps/intake/server.js"] 