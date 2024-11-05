# Build Stage
FROM node:20.18 AS build-stage

WORKDIR /app

# Disable Angular CLI analytics
ENV NG_CLI_ANALYTICS=false

# Copy and install dependencies
COPY ./app/package*.json ./
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the app files
COPY ./app .

# Build the Angular application
RUN ng build --configuration production

# Production Stage
FROM nginx:latest

# Copy the NGINX configuration file
COPY ./app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts to NGINX
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]
