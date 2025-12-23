# --- Stage 1: Build ---
FROM node:24-alpine As builder
WORKDIR /app

# COPY package.json and package-lock.json
COPY package*.json ./
RUN npm ci

# COPY the rest of the application code
COPY . .


# --- Stage 2: Runtime ---
FROM node:24-alpine As runtime
WORKDIR /app

# SET Production to optimised libraries 
ENV NODE_ENV=production

# COPY only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1
# use a non root user for secutiry
USER node
EXPOSE 3000

CMD ["node","src/index.js"]