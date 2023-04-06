# This file serves as a template for the Dockerfile that will be used to build the Docker image for the application.

# Base imag
FROM node:14-alpine as base

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Set environment variables
# ENV NODE_ENV production
ENV PORT 3000


# Expose the port
EXPOSE $PORT

# Start the server
CMD ["node", "index.js"]
 