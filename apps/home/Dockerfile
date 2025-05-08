# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/shared-components/package.json ./packages/shared-components/
COPY apps/home/package.json ./apps/home/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build --filter=home

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/apps/home/.next ./.next
COPY --from=builder /app/apps/home/public ./public
COPY --from=builder /app/apps/home/package.json ./package.json
COPY --from=builder /app/apps/home/next.config.js ./next.config.js

# Install production dependencies only
RUN pnpm install --prod

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"] 