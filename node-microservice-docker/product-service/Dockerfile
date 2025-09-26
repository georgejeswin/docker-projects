# ---------- Build stage ----------
FROM node:18 AS builder
WORKDIR /app

# Only copy package files first (better caching)
COPY package*.json ./
RUN npm install --production

# Copy rest of the app
COPY . .

# ---------- Runtime stage ----------
FROM node:18-slim
WORKDIR /app

# Copy only node_modules and built app from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 3002
CMD ["node", "index.js"]
