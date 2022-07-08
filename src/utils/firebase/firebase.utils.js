import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA8raVUXB6BCujzHBFoneLXlg2Vqs4elGo",
  authDomain: "crwn-db-987ba.firebaseapp.com",
  projectId: "crwn-db-987ba",
  storageBucket: "crwn-db-987ba.appspot.com",
  messagingSenderId: "302143214976",
  appId: "1:302143214976:web:1dec618cd99e3defea9d65"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWighGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
  
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    }catch(error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}
