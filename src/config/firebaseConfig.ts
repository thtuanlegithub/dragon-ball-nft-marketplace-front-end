import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlLTAceW1_55ZBv1IsMoyGrSQ2TNmSLrU',
  authDomain: 'dragon-ball-nft-marketplace.firebaseapp.com',
  projectId: 'dragon-ball-nft-marketplace',
  storageBucket: 'dragon-ball-nft-marketplace.appspot.com',
  messagingSenderId: '1026941251100',
  appId: '1:1026941251100:web:5ab488eb674a8bc7adb9d9',
  measurementId: 'G-RMXDR179BQ',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {firebaseApp, db};
