import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '@/consts.js'
export const firebase = initializeApp(firebaseConfig)
export const db = getFirestore(firebase)

export const featuresRef = collection(db, 'features')
