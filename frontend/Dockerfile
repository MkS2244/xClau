# frontend/Dockerfile

# Etapa dev
FROM node:20-bullseye AS dev
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Etapa build
FROM node:20-bullseye AS build
WORKDIR /app
COPY package.json ./ package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Etapa prod
FROM nginx:stable-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
