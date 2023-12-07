FROM node:21

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run db:generate
RUN pnpm run build

EXPOSE 3000
CMD ["node", "build"]
