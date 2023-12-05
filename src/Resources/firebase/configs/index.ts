// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBLfeohgBvllb3EErYOjhsmh0rAuxHn8d4',
    authDomain: 'gmrdaily-262e5.firebaseapp.com',
    projectId: 'gmrdaily-262e5',
    storageBucket: 'gmrdaily-262e5.appspot.com',
    messagingSenderId: '317143789853',
    appId: '1:317143789853:web:2fe3b287f5a2d170a871f4',
    measurementId: 'G-VXLX83BTKJ',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
export const storage = getStorage()

export const DefaultCollection = 'React'
export const DefaultSubCollection = 'Children'
export const DefaultDataSource = {
    colRef: 'DataSource',
    docId: 'CheckBox',
}
