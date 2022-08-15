import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import firebaseConfig from "../screens/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
// import { initializeApp } from "firebase/storage";
// // import { getStorage, ref, uploadBytes } from "firebase/app";
// import { firebase } from "@firebase/app";

// initializeApp(firebaseConfig);

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { useSelector } from "react-redux";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function ImageUploadCamera(props) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const user = useSelector((state) => state.auth.email);
  const [confirmed, setConfirmed] = useState(false);

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // props.setPickedImage(result.uri);
      //   console.log(result.uri);

      //   const storage = getStorage();
      //   const ref = (storage, "image");

      //   const img = await fetch(result.uri);
      //   const bytes = await img.blob();

      //   await uploadBytes(ref, bytes);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // props.setPickedImage(result.uri);
      //   const storage = getStorage();
      //   const ref = (storage, "image");

      //   const img = await fetch(result.uri);
      //   const bytes = await img.blob();

      //   await uploadBytes(ref, bytes);
      // console.log(result.uri);
    }
  };

  //   const uploadImage = async () => {
  //     const blob = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = function (e) {
  //         console.log(e);
  //         reject(new TypeError("Network request failed"));
  //       };
  //       xhr.responseType = "blob";
  //       xhr.open("GET", pickedImagePath, true);
  //       xhr.send(null);
  //     });
  //     const fileRef = firebase.storage().ref().child(new Date().toISOString());
  //     const snapshot = fileRef.put(blob);

  //     // We're done with the blob, close and release it
  //     blob.close();

  //     // return await getDownloadURL(fileRef);
  //   };

  const uploadImage = async () => {
    const response = await fetch(pickedImagePath);
    const blob = await response.blob();
    const filename = props.bookId + user;
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
      await ref;
      setConfirmed(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.screen}>
      {pickedImagePath === "" ? (
        <View style={styles.buttonContainer}>
          <Button onPress={showImagePicker} title="Odaberite iz galerije" />
          <Button onPress={openCamera} title="Kamera" />
        </View>
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pickedImagePath }} style={styles.image} />
          </View>
          {!confirmed && (
            <View>
              <Button onPress={uploadImage} title="Potvrdi odabir" />
              <Button
                onPress={() => setPickedImagePath("")}
                title="Ponisti odabir"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});

export default ImageUploadCamera;
