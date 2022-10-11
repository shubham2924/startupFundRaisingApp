import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  
} from "firebase/auth";
import {addDoc, collection,getFirestore, setDoc, doc, getDoc} from 'firebase/firestore';
import { auth,app } from "../firebase-config";
import { async } from "@firebase/util";
import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";
const db=getFirestore(app)
//const usersCollection = collection(db,"users")
const userAuthContext = createContext();

  

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

 async function logIn(email, password) {

    const docRef = doc(db, "users", `${email}`)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
    return docSnap
    return 
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}

  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  let navigate = useNavigate();

  function logOut() {
    return signOut(auth);
    // navigate('/')
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
        
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
export async function createUser(user) {
   await setDoc(doc(db,"users",`${user.email}`),user);
   return;
  }