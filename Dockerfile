FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN echo "build-$(date +%s)" && npm run build
EXPOSE 3002
CMD ["node", "server/index.js"]
