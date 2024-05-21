## Builder ##
FROM node:20-alpine3.18 as builder

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm -v

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

# Run the build script from package.json for pawza backend
RUN pnpm --filter="@pawza/backend" build           
# Create a min size bundle of dependencies to run the app
RUN pnpm --filter="@pawza/backend" deploy --prod out

## Runner ##
FROM node:20-alpine3.18 as runner
WORKDIR /usr/src/app

# Copy deployed bundle
COPY --from=builder /usr/src/app/out/dist ./dist
COPY --from=builder /usr/src/app/out/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
ENTRYPOINT ["node", "./dist/index.js"]
