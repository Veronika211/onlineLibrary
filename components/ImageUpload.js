import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
// import React, { useState, useEffect } from "react";
// import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
// import { Camera } from "expo-camera";
// // import { fireStorage } from "../config/environment";

// export default function ImageUpload() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const takePicture = async () => {
//     if (!camera) return;
//     let photo = await camera.takePictureAsync();
//     setPreviewVisible(true);
//     setCapturedImage(photo);
//   };

// //   async function uploadImageAsync(uri) {
// //     const blob = await new Promise((resolve, reject) => {
// //       const xhr = new XMLHttpRequest();
// //       xhr.onload = function () {
// //         resolve(xhr.response);
// //       };
// //       xhr.onerror = function (e) {
// //         console.log(e);
// //         reject(new TypeError("Network request failed"));
// //       };
// //       xhr.responseType = "blob";
// //       xhr.open("GET", uri, true);
// //       xhr.send(null);
// //     });

// //     const ref = fireStorage.ref().child(new Date().toISOString());
// //     const snapshot = await ref.put(blob);
// //     blob.close();
// //   }

//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       {previewVisible ? (
//         <ImageBackground
//           source={{ uri: capturedImage && capturedImage.uri }}
//           style={{
//             flex: 1,
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "column",
//               padding: 15,
//               justifyContent: "flex-end",
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <TouchableOpacity
//                 onPress={() => setPreviewVisible(false)}
//                 style={{
//                   width: 130,
//                   height: 40,

//                   alignItems: "center",
//                   borderRadius: 4,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "#fff",
//                     fontSize: 20,
//                   }}
//                 >
//                   Re-take
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ImageBackground>
//       ) : (
//         <Camera
//           style={{ flex: 1 }}
//           type={type}
//           ref={(r) => {
//             camera = r;
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: "transparent",
//               flexDirection: "row",
//             }}
//           >

//             <View
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 flexDirection: "row",
//                 flex: 1,
//                 width: "100%",
//                 padding: 20,
//                 justifyContent: "space-between",
//               }}
//             >
//               <View
//                 style={{
//                   alignSelf: "center",
//                   flex: 1,
//                   alignItems: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={takePicture}
//                   style={{
//                     width: 70,
//                     height: 70,
//                     bottom: 0,
//                     borderRadius: 50,
//                     backgroundColor: "#fff",
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </Camera>
//       )}
//     </View>
//   );
// }
