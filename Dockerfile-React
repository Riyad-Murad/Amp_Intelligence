# Step 1: Build the React app
FROM node:20 AS reactbuild

WORKDIR /app/React_Amp_Intelligence

# Install dependencies separately to leverage Docker cache
COPY ./React_Amp_Intelligence/package*.json ./
RUN npm install

# Now copy the rest of the app
COPY ./React_Amp_Intelligence ./

# Build the app
RUN npm run build

# Step 2: Serve the built app with Apache
FROM httpd:2.4

# Remove the default Apache page (optional)
RUN rm -rf /usr/local/apache2/htdocs/*

# Enable rewirte mode
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Copy built app into Apache's public folder
COPY --from=reactbuild /app/React_Amp_Intelligence/dist/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["httpd-foreground"]
