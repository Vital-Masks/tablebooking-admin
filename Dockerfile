FROM node:18

WORKDIR /app
COPY . .

RUN npm install //updated from RUN npm ci <-- due to code build failiure
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
