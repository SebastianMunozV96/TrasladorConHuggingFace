FROM node:20-alpine3.19 as builder
WORKDIR /home/app
COPY . .
RUN npm install && npm run build

FROM node:20-alpine3.19 as prod

RUN apk add ghostscript && apk add graphicsmagick
WORKDIR /home/app
COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/package*.json .
COPY --from=builder /home/app/factura.pdf .

RUN npm ci

EXPOSE 80

CMD ["node", "/home/app/dist/extractor.js"]