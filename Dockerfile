FROM node:20-alpine AS base
RUN npm install -g pm2

FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/ecosystem.config.js ./
EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
