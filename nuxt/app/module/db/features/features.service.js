import { addDoc, deleteDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { featuresRef } from '../db.firebase.js'

export const getFeatures = async () => {
  const features = []
  const querySnapshot = await getDocs(featuresRef)

  querySnapshot.forEach((doc) => {
    features.push(doc.data())
  })

  return features
}

export const getFeaturesByMaktab = async (maqtab) => {
  const features = []
  const q = query(featuresRef, where('properties.maqtab', '==', maqtab))
  const querySnapshot = await getDocs(q)


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
export const updateManyFeatures = async (items) => {
  const querySnapshot = await getDocs(featuresRef)
  querySnapshot.forEach(async (doc) => {
    const item = items.find(i => i.id === doc.data().id)
    if (item) {
      await updateDoc(doc.ref, item.data)
    }
  })
}
