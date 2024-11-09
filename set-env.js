const fs = require("fs");
require("dotenv").config({ path: ".env" });

const envVariables = `
  (function(window) {
    window.__env = window.__env || {};
    window.__env.apiUrl = "${process.env.NG_APP_API_URL}";
    window.__env.firebaseApiKey = "${process.env.NG_FIREBASE_API_KEY}";
    window.__env.firebaseAuthDomain = "${process.env.NG_FIREBASE_AUTH_DOMAIN}";
    window.__env.firebaseProjectId = "${process.env.NG_FIREBASE_PROJECT_ID}";
    window.__env.firebaseStorageBucket = "${process.env.NG_FIREBASE_STORAGE_BUCKET}";
    window.__env.firebaseMessagingSenderId = "${process.env.NG_FIREBASE_MESSAGING_SENDER_ID}";
    window.__env.firebaseAppId = "${process.env.NG_FIREBASE_APP_ID}";
  })(this);
`;

fs.writeFileSync("./src/assets/runtime.js", envVariables);
