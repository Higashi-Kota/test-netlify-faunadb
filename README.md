- Original

  - [netlify-faunadb-example](https://github.com/netlify/netlify-faunadb-example)

- Reference

  - [Netlify Functions](https://www.netlify.com/docs/functions/)
  - [Netlify JSON web token-based Identity](https://identity.netlify.com/)
  - [content-editable-elements-in-javascript-react](https://www.taniarascia.com/content-editable-elements-in-javascript-react/?utm_source=pocket_mylist)

- Stack

  - [react-toastify](https://github.com/fkhadra/react-toastify)

- Todo
  - react class >>> react function
  - emotionaize css in js

## Set Env

- Set Netlify Dashboard Variable Env

```bash
$ touch .env
$ echo FAUNA_DB_SERVER_KEY=HERE_YOUR_KEY >.env
```

## Set Up

```bash
$ yarn setup
```

## Serve Dev

```bash
$ netlify dev
```

## Build

```bash
$ yarn build
```

## Deploy Dev

```bash
$ time netlify deploy
```

## Deploy Prod

- First
  [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/Higashi-Kota/test-netlify-faunadb)

- After Second

```bash
$ time netlify deploy --prod
```
