sed -i "s|%%NG_APP_API_URL%%|$NG_APP_API_URL|g" ./src/environments/environment.prod.ts
sed -i "s|%%NG_FIREBASE_API_KEY%%|$NG_FIREBASE_API_KEY|g" ./src/environments/environment.prod.ts
sed -i "s|%%NG_FIREBASE_AUTH_DOMAIN%%|$NG_FIREBASE_AUTH_DOMAIN|g" ./src/environments/environment.prod.ts
sed -i "s|%%NG_FIREBASE_PROJECT_ID%%|$NG_FIREBASE_PROJECT_ID|g" ./src/environments/environment.prod.ts
sed -i "s|%%NG_FIREBASE_STORAGE_BUCKET%%|$NG_FIREBASE_STORAGE_BUCKET|g" ./src/environments/environment.prod.ts
sed -i "s|%%NG_FIREBASE_MESSAGING_SENDER_ID%%|$NG_FIREBASE_MESSAGING_SENDER_ID|g" ./src/environments/environment.prod.ts
sed -i "s|%%NG_FIREBASE_APP_ID%%|$NG_FIREBASE_APP_ID|g" ./src/environments/environment.prod.ts

ng build --configuration production
