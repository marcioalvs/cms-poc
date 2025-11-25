# Stage 1: Install dependencies (deps stage)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application (builder stage)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Run the application (runner stage)
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Create a non-root user and set permissions
RUN apk add --no-cache tini
RUN addgroup --gid 1001 nodejs
RUN adduser -S -u 1001 nodejs
USER nodejs

# Copy the standalone output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port and start the application
EXPOSE 3000
CMD ["tini", "--", "node", "server.js"]
