# [utulsa.tips](https://utulsa.tips) README

This README is also available in the repo in HTML form – see `README.html`.

The `NOTES.md` file (and its `NOTES.html` counterpart) are my own miscellaneous and poorly organized development notes.

Below, I explain some potentially confusing aspects of the repo...

## What is the meaning of `nepeykozlenchikomstanish`?

This is a secret admin API endpoint.
The idea is that only the admin knows that the obscure URL
`http://utulsa-tips-api.herokuapp.com/nepeykozlenchikomstanish/` even exists.
The public endpoint is at `http://utulsa-tips-api.herokuapp.com/tips/`.
It's obviously far from ideal,
but it's an easy temporary fix.

## `test` directory and `.rest` files

I used to use Postman for API testing, 
then I found a simpler way: 
the "Rest Client" extension for Visual Studio Code.
The `.rest` files integrate with that extension.
The `.rest` files are separated according to whether
they target my localhost dev server or the public heroku deployment,
as well as according to whether
they target the public or admin endpoints of the API.

– Nikita Zdvijkov