# Middleware API for discogs-messenger

### Tech-stack

- NodeJS (v8+)
- ESLint
- Koa 2
- Koa Router
- Request-promise
- Jest
- Mocha
- Supertest
- Chai
- Terraform
- CircleCI
- AWS EC2 & S3


### Starting the app

The app uses https on localhost, in order to be able to make use of HTTPS cookies (and to mirror a real-life scenario better).
It does this by using a self-signed certificate which you need to generate yourself.

So to do this, simply generate the key and certificate by using openssl (write these commands in your terminal):

> openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

> openssl rsa -in keytmp.pem -out key.pem

after doing that, copy both `cert.pem` and `key.pem` in the `/certs` directory and you're done.

### Testing

#### Unit tests

The unit tests can be found under the `__tests__` directories, so it's using the default jest convention.

#### Integration tests

The integration tests are written using a combination of `mocha`, `supertest`, `chai` and `nock`. They are named like `modulefile.spec.js` and placed right next to the module itself.