FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001
CMD ["npm", "start"]

# # -----------------------------
# # 1️⃣ Base image
# # -----------------------------
# FROM node:20-alpine AS base

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the project files
# COPY . .

# # Expose the application port
# EXPOSE 5001

# # Default command (for production)
# CMD ["node", "server.js"]


# # -----------------------------
# # 2️⃣ Development Stage (optional)
# # -----------------------------
# FROM base AS development

# # Install nodemon globally
# RUN npm install -g nodemon

# # Expose port again
# EXPOSE 5001

# # Use nodemon in development mode
# CMD ["npm", "run", "dev"]
