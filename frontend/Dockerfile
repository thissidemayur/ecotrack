FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci


FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# create non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# copy standalone output
COPY --from=builder /app/.next/standalone ./

# copy static assets
COPY --from=builder /app/.next/static ./.next/static

# copy public folder
COPY --from=builder /app/public ./public

# set ownership
RUN chown -R nextjs:nextjs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]