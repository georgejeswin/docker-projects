# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose API port
EXPOSE 5000

# Start app
CMD ["node", "server.js"]