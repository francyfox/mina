import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyDAkA0LLaOmJRgi2eD6hVA6Cte1AcK5YR0",
  authDomain: "marwa-b0eb8.firebaseapp.com",
  projectId: "marwa-b0eb8",
  storageBucket: "marwa-b0eb8.appspot.com",
  messagingSenderId: "1064049645860",
  appId: "1:1064049645860:web:40d8b54043a774dc1b7bb1"
}
export const firebase = initializeApp(firebaseConfig)
export const db = getFirestore(firebase)

export const featuresRef = collection(db, 'features')
