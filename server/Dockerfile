FROM node:14 As Production
ENV NODE_ENV=production


WORKDIR /user/src/api
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm start
CMD ["sh","-c","npm start"]