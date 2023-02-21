FROM node:18.13.0
COPY . .
RUN npm install
RUN npx prisma generate
EXPOSE 3000
CMD ["/bin/bash", "-c","npx prisma db push && npm run start"]