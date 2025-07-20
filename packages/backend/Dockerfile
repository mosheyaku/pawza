FROM node:20-alpine3.18 as builder

RUN apk add --no-cache curl bash

RUN curl -fsSL https://get.pnpm.io/install.sh | bash -

ENV PATH="/root/.local/share/pnpm:$PATH"

WORKDIR /usr/src/app

COPY package.json pnpm-*.yaml tsconfig.base.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/devtools ./packages/devtools

RUN pnpm install

COPY packages/backend ./packages/backend

RUN pnpm --filter="@pawza/backend" build
RUN pnpm --filter="@pawza/backend" deploy --prod out

FROM node:20-alpine3.18 as runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/out/dist ./dist
COPY --from=builder /usr/src/app/out/node_modules ./node_modules
COPY --from=builder /usr/src/app/out/package.json ./package.json

EXPOSE 80

ENTRYPOINT ["node", "./dist/index.js"]
