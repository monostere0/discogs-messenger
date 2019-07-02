# Node / Koa API for discogs-messenger

## Tech-stack

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
- Logz.io


## Starting the app

### Generating a self-signed certificate for HTTPS

The app uses https on localhost, in order to be able to make use of HTTPS cookies (and to mirror a real-life scenario better).
It does this by using a self-signed certificate which you need to generate yourself.

So to do this, simply generate the key and certificate by using openssl (write these commands in your terminal):

> openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

> openssl rsa -in keytmp.pem -out key.pem

after doing that, copy both `cert.pem` and `key.pem` in the `/certs` directory and you're done.

### Creating an env file for secrets

The API uses dotenv to manage the app secrets.
You will need to create an .env file in the api/ directory, using this template:

```
DISCOGS_OAUTH_KEY=
DISCOGS_OAUTH_SECRET=
LOGZIO_ACCESS_TOKEN=
TF_VAR_aws_region=
TF_VAR_aws_access_key_id=
TF_VAR_aws_secret_access_key=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

It contains the various tokens for authenticating into Discogs' API, Logz.io for logging the errors and events, and AWS access key IDs and region for Terraform.

### Running the API

You can run "npm start" which will fire nodemon for local development.

If you want to mirror the production, you will have to run docker-build.sh, which builds the Dockerfile and creates the container, exposing the 8080 port.

## Testing

#### Unit tests

The unit tests can be found under the `__tests__` directories, so it's using the default jest convention.

#### Integration tests

The integration tests are written using a combination of `mocha`, `supertest`, `chai` and `nock`. They are named like `modulefile.spec.js` and placed right next to the module itself.
