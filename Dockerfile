FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "yarn", "dev" ]