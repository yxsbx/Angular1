export const environment = {
  production: false,
  apiUrl: process.env['NG_APP_API_URL'] || '',
  useEmulator: true,
  useLocalApi: false,
  firebaseConfig: {
    apiKey: process.env['NG_FIREBASE_API_KEY'] || '',
    authDomain: process.env['NG_FIREBASE_AUTH_DOMAIN'] || '',
    projectId: process.env['NG_FIREBASE_PROJECT_ID'] || '',
    storageBucket: process.env['NG_FIREBASE_STORAGE_BUCKET'] || '',
    messagingSenderId: process.env['NG_FIREBASE_MESSAGING_SENDER_ID'] || '',
    appId: process.env['NG_FIREBASE_APP_ID'] || '',
  },
};
