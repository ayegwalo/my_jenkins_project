# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# TO Start application
CMD [ "npm", "start" ]
