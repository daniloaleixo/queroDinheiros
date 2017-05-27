// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCi-a5Wx0E3RHxpyBparukydEpVYQ7BR-Q",
    authDomain: "quero-dinheiros.firebaseapp.com",
    databaseURL: "https://quero-dinheiros.firebaseio.com",
    projectId: "quero-dinheiros",
    storageBucket: "quero-dinheiros.appspot.com",
    messagingSenderId: "727342562932"
  }
};