# frontend/Dockerfile
# Etapa dev
FROM node:18-alpine AS dev
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Etapa build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
#RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Etapa prod
FROM nginx:stable-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
