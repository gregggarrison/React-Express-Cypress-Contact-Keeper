FROM cypress/base:14.5.0

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install 

RUN $(npm bin)/cypress verify
# RUN npm run dev && ["npm", "run", "cypress:e2e"]
# EXPOSE 3000
# RUN ["npm", "run", "dev"]
RUN ["npm", "run", "cypress:e2e"]