
import { addDoc, collection, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import { db, featuresRef } from '../db.firebase.js'

export const getFeatures = async () => {
  const features = []
  const querySnapshot = await getDocs(featuresRef)

  querySnapshot.forEach((doc) => {
    features.push(doc.data())
  })

  return features
}
export const addFeature = async (data) =>
  await addDoc(featuresRef, data)

export const removeFeature = async (id) => {
  const q = query(featuresRef, where('id', '==', id))
  const querySnapshot = await getDocs(q)
  await deleteDoc(querySnapshot.docs[0].ref)
}

export const updateFeature = async (id, data) => {
  const q = query(featuresRef, where('id', '==', id))
  const querySnapshot = await getDocs(q)
  await updateDoc(querySnapshot.docs[0].ref, data)
}
