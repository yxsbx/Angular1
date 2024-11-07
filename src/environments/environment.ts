export const environment = {
  production: false,
  apiUrl: 'https://zenflow-back-end-java.onrender.com',
  firebaseConfig: {
    apiKey: (window as any).__env.firebaseApiKey || '',
    authDomain: (window as any).__env.firebaseAuthDomain || '',
    projectId: (window as any).__env.firebaseProjectId || '',
    storageBucket: (window as any).__env.firebaseStorageBucket || '',
    messagingSenderId: (window as any).__env.firebaseMessagingSenderId || '',
    appId: (window as any).__env.firebaseAppId || '',
  },
  useLocalApi: false,
};
