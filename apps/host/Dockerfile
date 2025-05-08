# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared-components/package.json ./packages/shared-components/
COPY apps/host/package.json ./apps/host/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build --filter=host

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/apps/host/.next ./.next
COPY --from=builder /app/apps/host/public ./public
COPY --from=builder /app/apps/host/package.json ./package.json
COPY --from=builder /app/apps/host/next.config.js ./next.config.js

# Install production dependencies only
RUN pnpm install --prod

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 