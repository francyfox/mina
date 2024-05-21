import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyA_3VMW28JFgz5KGdUKUucsRFFIdvLmarw',
  authDomain: 'mina-gorodok.firebaseapp.com',
  projectId: 'mina-gorodok',
  storageBucket: 'mina-gorodok.appspot.com',
  messagingSenderId: '369463332361',
  appId: '1:369463332361:web:04ab194fd851fb8241b2d8'
}
export const firebase = initializeApp(firebaseConfig)
export const db = getFirestore(firebase)

export const featuresRef = collection(db, 'features')
