'use strict';
const http = require('node:http');
const pug = require('pug');
const server = http
  .createServer((req, res) => {
    const now = new  Date();
    console.info(`${req.socket.remoteAddress} からアクセスがありました。`)
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    switch (req.method) {
      case 'GET':
        if (req.url === '/') {
          res.write(pug.renderFile('./top.pug'));
        } else if (req.url === '/enquetes') {
          res.write(pug.renderFile('./enquetes.pug'));
        } else if (req.url === '/enquetes/yaki-tofu') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '焼き肉',
              secondItem: '湯豆腐'
            })

          );
        } else if (req.url === '/enquetes/rice-bread') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: 'ごはん',
              secondItem: 'パン'
            })
          );
        } else if (req.url === '/enquetes/sushi-pizza') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '寿司',
              secondItem: 'ピザ'
            })
          );
        }
        res.end();
        break;
      case 'POST':
        let rawData = '';
        req
          .on('data', chunk => {
            rawData += chunk;
          })
          .on('end', () => {
            const answer = new URLSearchParams(rawData);
            const name = answer.get('name');
            const favorite = answer.get('favorite');
            const body = `${name}さんは${favorite}に投票しました`;
            console.info(`${body}`);
            res.write(
              `<!DOCTYPE html><html lang="ja"><body><h1>${body}</h1></body></html>`
            )
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on('error', e => {
    console.error(`サーバーエラー`, e);
  })
  .on('clientError', e => {
    console.error(`クライアントエラー`, e);
  });
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info(`ポート ${port}番 でサーバーが動いています。`)
});