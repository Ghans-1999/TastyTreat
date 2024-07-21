import Layout from "./components/Layout/Layout";
import { Client, ID, promise, account, client } from "./lib/appwrite.js";
import { useEffect } from "react";
import { messaging } from "./lib/firebase";
import { getToken } from "firebase/messaging";

function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BNXYg1HT6f9RbUxnAQl-VPIZz2Q6Q-MTm2lYKT1XydbadDII8qyDQlYDSfgoW01mNvSC3udeKjk0Ww5Jajczma8",
      });
      console.log("Token Gen", token);
      localStorage.setItem("fcmToken", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
      
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);
  return <Layout />;
}

export default App;
