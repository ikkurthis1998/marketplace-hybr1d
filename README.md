# Marketplace
### Setting this project up locally

In order to start using Server locally, you need to make Prisma aware of your database. The most portable way to do this is to use environment variables via a `.env` file. 

The database used for this project is PostgreSQL.

1. Run `npm i` to install all node dependencies.
2. You'll see that your Prisma Schema file (at `prisma/schema.prisma`) is already configured to use an environment variable called `DATABASE_URL`. [Read more about environment variables in Prisma](https://www.prisma.io/docs/concepts/more/environment-variables)
3. You'll need a database to connect to. You may use the local database and use that during development. If you're new to databases, we recommend [reading up](https://www.prisma.io/dataguide/) on them. This guide also has instructions on how to set up a local database.
4. Once you have a locally accessible database connection string, create a new file called `.env` in the root directory, and populate it with: `DATABASE_URL="<replace-me-with-your-connection-string>"`. Prisma will automatically pick up the environment variable used in the schema and use its value to connect to your database.
5. If you are on Linux/Mac run `npm run genCertsDev`. If you are on Windows, create a folder certs in src/ and run `openssl genrsa -out src/certs/access_private.pem 1024 && openssl rsa -in src/certs/access_private.pem -pubout -out src/certs/access_public.pem`. If openssl is not installed already, easiest way to install is using chocolatey, using the command `choco install openssl`.
6. Now you can run `npm run dev` and the server will be running at http://localhost:3000 by default.


### API Doc
Postman Doc for the API: https://documenter.getpostman.com/view/15410355/UzQvskDr
