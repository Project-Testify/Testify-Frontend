# Stage 1: Install dependencies and build the app
FROM node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the app with Vite

# Environment --max-old-space-size=4096 is required for building the app
RUN NODE_OPTIONS=--max-old-space-size=4096 pnpm run build

# RUN pnpm run build

# Stage 2: Serve the build with a lightweight web server
FROM nginx:alpine AS production

# Copy the build output from the builder stage to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
