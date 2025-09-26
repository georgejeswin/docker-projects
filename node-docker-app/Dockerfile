# 1. Start from official Node.js image
FROM node:20

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json first (better for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the code
COPY . .

# 6. Expose port 3000
EXPOSE 5000

# 7. Run the app
CMD ["node", "index.js"]
