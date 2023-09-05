FROM node:16.7-alpine AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:1.21.1-alpine AS deploy-static

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:18-alpine AS deploy-node

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package*.json .
COPY --from=build /app/build .
RUN yarn --production
CMD ["node", "index.js"]

#docker build -t svelte-docker-static -f Dockerfile --target deploy-static .