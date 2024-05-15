
import { addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../db.firebase.js'

export const getFeatures = async () => {
  const features = []
  const querySnapshot = await getDocs(collection(db, 'features'))

  querySnapshot.forEach((doc) => {
    features.push(doc.data())
  })

  return features
}
export const addFeature = async (data) =>
  await addDoc(collection(db, 'features'), data)

export const removeFeature = async (id) => {
  const querySnapshot = await getDocs(collection(db, 'features').where('id', 'in', id))
  await querySnapshot.docs[0].reference.delete()
}

export const updateFeature = async (id, data) => {
  const querySnapshot = await getDocs(collection(db, 'features').where('id', 'in', id))
  await feature.docs[0].reference.update(data)
}
