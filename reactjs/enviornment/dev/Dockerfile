FROM node:10.15.3 as build
WORKDIR /app
COPY . .
COPY ./enviorments/dev/nginx.conf nginx.conf
RUN npm i
RUN npm run build
COPY ./src/assets ./dist
FROM nginx:1.15.4
EXPOSE 8080
COPY --from=build /app/dist/ /var/www/
COPY ./enviorments/dev/nginx.conf /etc/nginx/conf.d/default.conf
