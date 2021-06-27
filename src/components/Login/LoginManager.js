import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

export const initializeLoginFrameworks = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
};

const setUserToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem('token', idToken);
    })
    .catch(function (error) {
      // Handle error
    });
};

export const handleGoogleSignIn = () => {
  const gProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(gProvider)
    .then(res => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      setUserToken();
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then(result => {
      const credential = result.credential;
      const user = result.user;
      user.success = true;
      return user;
      const accessToken = credential.accessToken;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      var email = error.email;
      var credential = error.credential;
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
      };
      return signedOutUser;
    })
    .catch(err => {});
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return updateUserName;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = name => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(function () {
      console.log('User Name updated successfully');
    })
    .catch(function (error) {
      console.log(error);
    });
};
