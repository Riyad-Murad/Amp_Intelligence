# Step 1: Build the React app
FROM node:20 AS reactBuild

WORKDIR /app

# Install dependencies
COPY ./React_Amp_Intelligence/package*.json /app/
RUN npm install

# Copy app source code
COPY ./React_Amp_Intelligence /app/

# Build the React app
RUN npm run build

# Step 2: Serve the build with Apache
FROM httpd:2.4

# Copy the built app into Apache's default public directory
COPY --from=reactBuild /app/build/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["httpd-foreground"]
