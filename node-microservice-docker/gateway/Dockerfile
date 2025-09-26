# ---------- Build stage ----------
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# ---------- Runtime stage ----------
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 4000
CMD ["node", "index.js"]