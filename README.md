# API-2

*ATTENTION:* go to mongoose website and see the starter code they have
to hopefully fix the issue of soon-to-be depricated mongoose
(see terminal error output bellow -- not error, but warning, really).
From mongoose website:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

Run `npm run readme` to convert readme to HTML and open in browser.
Script defined in `package.json`: 

```json
"scripts": {
    "readme": "pandoc README.md -s -o README.html && open README.html"
  }
```

Interesting point:
GET request to `localhost:3000/README.html`
will return an error,
so does not function as webserver.

Following tutorial:

- [academind.com](https://academind.com/learn/node-js/building-a-restful-api-with/adding-more-routes-to-the-api/)
- [academind on youtube](https://www.youtube.com/watch?v=UVAMha41dwo&feature=emb_logo)

## How to deploy to heroku:

```bash
git add -A
git commit -m "description of changes made"
heroku login
# IF NEVER BEFORE DEPLOYED: heroku create
git push heroku master
# DONE -- now go test with postman
```

Or command `npm run deploy` (script defined in `package.json`):

```json
"scripts": {
    "deploy": "git add -A && git commit && heroku login && git push heroku master"
  }
```

## How to localhost:

```bash
node server.js
# now go to localhost:3000
```

## How the nodemon thing works:

Nodemon: server restarts every time a file changes.

Install by: `npm install --save-dev nodemon`

Nodemon is not installed globally.
Only works when run from this project directory.
Normally, would use `nodemon server.js` to start server.
Better way already implemented: add start script to `package.json`
that gets run when you command `npm start` (NOT `npm run start`).
`package.json` entry: 

```json
"scripts": {
    "start": "echo \"Starting nodemon server...\" && nodemon server.js"
  }
```

## morgan for logging

installed with: `npm install --save morgan`

## Notes on body parsing & CORS vid

full vid title: Parsing the Body & Handling CORS | Creating a REST API with Node.js

- add package: `npm install --save body-parser`

### JSON body parser POST test:

request: `POST localhost:3000/products` with body:

```json
{
	"name": "shoes",
	"price": "10.00"
}
```

note: for valid json, everything must be in quotation marks

response:

```json
{
    "message": "Handling POST requests to /products",
    "createdProduct": {
        "name": "shoes",
        "price": "10.00"
    }
}
```

orders also works as expected

## Notes on first database vid

will use mongoose instead of official client: 
`npm install --save mongoose`

watch out for this shit with mongoose/mongodb atlas:

```
(node:22727) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:22727) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
```

and

```
WARNING: The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
    at handleUseMongoClient (/Users/nikitazdvijkov/Documents/vm-shared/GITHUB/misc-experiments/SUMMER-INTERNSHIP-SPRINT-FEB-2020/API-2/node_modules/mongoose/lib/connection.js:840:17)
    at NativeConnection.Connection.openUri (/Users/nikitazdvijkov/Documents/vm-shared/GITHUB/misc-experiments/SUMMER-INTERNSHIP-SPRINT-FEB-2020/API-2/node_modules/mongoose/lib/connection.js:635:7)
    at Mongoose.connect (/Users/nikitazdvijkov/Documents/vm-shared/GITHUB/misc-experiments/SUMMER-INTERNSHIP-SPRINT-FEB-2020/API-2/node_modules/mongoose/lib/index.js:332:15)
    at Object.<anonymous> (/Users/nikitazdvijkov/Documents/vm-shared/GITHUB/misc-experiments/SUMMER-INTERNSHIP-SPRINT-FEB-2020/API-2/app.js:7:10)
    at Module._compile (internal/modules/cjs/loader.js:1139:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1159:10)
    at Module.load (internal/modules/cjs/loader.js:988:32)
    at Function.Module._load (internal/modules/cjs/loader.js:896:14)
    at Module.require (internal/modules/cjs/loader.js:1028:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/Users/nikitazdvijkov/Documents/vm-shared/GITHUB/misc-experiments/SUMMER-INTERNSHIP-SPRINT-FEB-2020/API-2/server.js:2:13)
    at Module._compile (internal/modules/cjs/loader.js:1139:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1159:10)
    at Module.load (internal/modules/cjs/loader.js:988:32)
    at Function.Module._load (internal/modules/cjs/loader.js:896:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
(node:22858) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:22858) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
```

### how to env variable with nodemon

create `nodemon.json` file with contents:
```json
{
    "env": {
        "MONGO_ATLAS_PW": "blahablahldfadfadf"
    }
}
```

### test database and product id stuff

`POST` request to `localhost/3000/products` with body:

```json
{
	"name": "shoes",
	"price": "19.99"
}
```

response:

```json
{
    "message": "Handling POST requests to /products",
    "createdProduct": {
        "_id": "5e407b065199dc5b669851de",
        "name": "shoes",
        "price": 19.99
    }
}
```

for cluster, go to COLLECTIONS tab to see the data!

### GETTING from database:

(postman) `GET` request to `localhost:3000/products/5e407d6d2fb9490017b07f75` with NO body. response:

```json
{
    "_id": "5e407d6d2fb9490017b07f75",
    "name": "shirt",
    "price": 5,
    "__v": 0
}
```

note difference between invalid ID and an ID that does not exist:
```
valid:   5e407d6d2fb9490017b07f75
invalid: 5e407d6d2fb9490017b07f7  (bc string too short)
DNE:     5e407d6d2fb9490017b07f76 (bc final character differs)
```

### make general GET request to /products:

response (note: square brackets make it an array):
```json
[
    {
        "_id": "5e407b065199dc5b669851de",
        "name": "shoes",
        "price": 19.99,
        "__v": 0
    },
    {
        "_id": "5e407d6d2fb9490017b07f75",
        "name": "shirt",
        "price": 5,
        "__v": 0
    }
]
```

## MISC

- In `package.json`, renamed script from `start` to `dev-start` to avoid heroku errors.
Run `npm run dev-start`. Re-added morgan logging.
- figure out how to connect git to heroku so heroku auto-deploys on update like netlify
- running `heroku local web` deploys app to `localhost:5000`