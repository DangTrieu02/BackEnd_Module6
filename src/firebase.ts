import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyC8gtxrA8bX_cw0HIdqZ-Jl8vex8p4pCR0",
    authDomain: "blog-9eed5.firebaseapp.com",
    projectId: "blog-9eed5",
    storageBucket: "blog-9eed5.appspot.com",
    messagingSenderId: "807284928174",
    appId: "1:807284928174:web:726c116b4500597904873f",
    measurementId: "G-G8GZE16MRF"

};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};