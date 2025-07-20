## Builder ##
FROM node:20-alpine3.18 as builder

# Install curl to download pnpm
RUN apk add --no-cache curl

# Install pnpm manually (מעדכן את pnpm לגרסה האחרונה)
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Add pnpm ל-PATH
ENV PATH="/root/.local/share/pnpm:$PATH"

# Create app directory
WORKDIR /usr/src/app

# Copy files required for dependencies installation
COPY package.json pnpm-*.yaml tsconfig.base.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/devtools ./packages/devtools

# Install dependencies
RUN pnpm install 

# Copy the rest of the application code
COPY packages/backend ./packages/backend

# Build and deploy backend
RUN pnpm --filter="@pawza/backend" build
RUN pnpm --filter="@pawza/backend" deploy --prod out

## Runner ##
FROM node:20-alpine3.18 as runner
WORKDIR /usr/src/app

# Copy deployed bundle
COPY --from=builder /usr/src/app/out/dist ./dist
COPY --from=builder /usr/src/app/out/node_modules ./node_modules
COPY --from=builder /usr/src/app/out/package.json ./package.json

# Expose the port the app runs on
EXPOSE 80

# Command to run the app
ENTRYPOINT ["node", "./dist/index.js"]
