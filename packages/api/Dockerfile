# Use the official Node.js image as a base for building
FROM public.ecr.aws/docker/library/node:iron-alpine3.18 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the source code and necessary files
COPY src ./src
COPY tsconfig.json .
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Start a new stage
FROM public.ecr.aws/docker/library/node:iron-alpine3.18 AS runner

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the built application code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port on which the application will run
EXPOSE 4000

# Set environment variables
ENV PORT 4000
ENV NODE_ENV production

# Command to start the application
CMD node ./dist/index.js
