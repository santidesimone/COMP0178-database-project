# Step 1: Build the Angular app

FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build 


# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built app from the previous stage to Nginx's default directory
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run Nginx (default command)
CMD ["nginx", "-g", "daemon off;"]
