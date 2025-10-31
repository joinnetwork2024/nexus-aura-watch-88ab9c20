# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all source files (package.json is read-only, so we copy everything)
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
