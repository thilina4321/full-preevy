# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
