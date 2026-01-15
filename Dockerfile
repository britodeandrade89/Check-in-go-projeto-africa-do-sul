# multistage build for a Vite + Node static site
FROM node:18-alpine AS builder
WORKDIR /app

# install deps and build
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# install only production deps
COPY package.json package-lock.json* ./
RUN npm install --production --legacy-peer-deps

# copy built assets and server
COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
