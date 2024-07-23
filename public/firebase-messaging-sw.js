importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyD2bYT3SexgdZCYKZK0AOCJnwtibmbfk6c",
  authDomain: "fcm-appwrite.firebaseapp.com",
  projectId: "fcm-appwrite",
  storageBucket: "fcm-appwrite.appspot.com",
  messagingSenderId: "941750598723",
  appId: "1:941750598723:web:167e83c382ac35b431e8f6",
  measurementId: "G-VQG52TK90W",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
