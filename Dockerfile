FROM nginx:1.25.4-alpine-slim

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf



# # Stage 1: Build the React app
# FROM node:20-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and lock file
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy all source files
# COPY . .

# # Build the app
# RUN npm run build

# # Stage 2: Serve the app with Nginx
# FROM nginx:1.25.4-alpine-slim

# # Remove default Nginx static files
# RUN rm -rf /usr/share/nginx/html/*

# # Copy only the build output from the builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Copy custom Nginx config
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
