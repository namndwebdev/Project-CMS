FROM node:8
# Create app directory
WORKDIR /home
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]