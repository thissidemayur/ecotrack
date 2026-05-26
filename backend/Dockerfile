FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci


FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# install curl for healthcheck
RUN apk add --no-cache curl

# copy package files
COPY --from=deps /app/package*.json ./

# copy node_modules
COPY --from=deps /app/node_modules ./node_modules

# remove devDependencies
RUN npm prune --omit=dev

# copy source code
COPY . .

# use non-root user
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]