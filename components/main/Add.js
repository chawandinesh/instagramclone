import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function App({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCamaraPermission, setHasCamaraPermission] = useState(null);
  const [camara, setCamara] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const camaraStatus = await Camera.requestPermissionsAsync();
      setHasCamaraPermission(camaraStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camara) {
      const data = await camara.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCamaraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCamaraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.camaraContainer}>
        <Camera
          ref={(ref) => setCamara(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Pick a image" onPress={() => pickImage()}></Button>
      <Button title="Take a Picture" onPress={() => takePicture()}></Button>
      <Button title="Save" onPress={() => navigation.navigate('Save', {image})}></Button>

      {image && <Image source={{ uri: image }} style={styles.takenImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  camaraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  takenImage: {
    flex: 1,
  },
});

{
  /* <Camera style={styles.camera} type={type}>
<View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    }}>
    <Text style={styles.text}> Flip </Text>
  </TouchableOpacity>
</View>
</Camera> */
}
