#sudo docker build -t tacs-frontend:1.0.0 .
#docker run -d -p 8080:80 tacs-frontend:1.0.0

FROM node:10-alpine AS builder
WORKDIR /build
COPY package.json .
RUN npm install 
COPY angular.json .
COPY tsconfig.json .
COPY src src
#RUN apk add --no-cache bash
RUN npm run-script ng -- build --prod

FROM nginx:1.10-alpine
COPY --from=builder /build/dist/tacs-frontend /usr/share/nginx/html