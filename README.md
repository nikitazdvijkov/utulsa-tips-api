# UTulsa.Tips REST API backend

by Nikita Zdvijkov

[utulsa.tips](https://utulsa.tips)

## Security

The public API endpoint is at `http://utulsa-tips-api.herokuapp.com/tips/`.
Unprivileged users can only perform the actions described by the file `/api/routes/tips.js`.

The admin endpoint is at a secret URL specified by `process.env.ADMIN_ENDPOINT`, 
a config var set through the Heroku dashboard.
Admin can perform actions described by the file `/api/routes/admin.js`.

## `TEST.rest` file

Install "Rest Client" extension for Visual Studio Code
in order to use the `TEST.rest` file.
It's an alternative to [Postman](https://www.postman.com/).