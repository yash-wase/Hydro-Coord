# ── Stage 1: base ──────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# ── Stage 2: production image ───────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app .

# Railway injects PORT automatically; fallback to 4000 locally
ENV PORT=4000

EXPOSE $PORT

CMD ["node", "server.js"]
