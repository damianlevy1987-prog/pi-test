FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run typecheck && npm run build
RUN npm prune --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/database/schema.sql ./src/database/schema.sql
COPY --from=build /app/scripts ./scripts
COPY package.json ./

RUN chmod +x scripts/wait-for-postgres.sh scripts/start.sh

EXPOSE 3000
CMD ["sh", "./scripts/start.sh"]
