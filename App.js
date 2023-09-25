import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";

export default function App() {
  //set an intial state to store the user
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  GoogleSignin.configure({
    webClientId:
      "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    // use own webClientId
  });
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_signin = await auth().signInWithCredential(googleCredential);
    user_signin
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return null;
  if (!user) {
    return (
      <View style={styles.container}>
        <Header />
        <GoogleSigninButton
          style={{ width: 260, height: 65, marginTop: 250 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Welcome {user.displayName}</Text>
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 300, height: 300, borderRadius: 150, margin: 50 }}
        />
        <TouchableOpacity onPress={signOut}>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              backgroundColor: "#7AD7F0",
              padding: 10,
              borderRadius: 10,
              fontWeight: "bold  ",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 23,
    color: "black",
    fontWeight: "bold",
    marginTop: 80,
  },
});
