# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.1.0
ARG PNPM_VERSION=9.12.0

# base stage to have pnpm installed ----------------------------------------------

FROM node:${NODE_VERSION}-alpine As base


# Install pnpm.
#RUN npm i -g pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# development stage-------------------------------------------------------------------

FROM base AS development

ARG APP 

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./ 

RUN pnpm install

COPY . . 

RUN pnpm run build ${APP}

# production stage -------------------------------------------------------------------------

FROM base AS production 

ARG APP

ARG NODE_ENV=production 

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app 

COPY package.json pnpm-lock.yaml ./ 

#RUN pnpm install --prod


# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage a bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them into
# into this layer.

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

# Add an env to save ARG
ENV APP_MAIN_FILE=dist/apps/${APP}/main 

CMD node ${APP_MAIN_FILE}





