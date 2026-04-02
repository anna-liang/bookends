# Build the application
FROM node AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Copy source code and build
RUN npm run build

FROM node
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 8000
CMD ["node", "dist/server.js"]