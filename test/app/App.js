import React, { useState } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });
      formData.append("content", content);
      const response = await axios.post(
        "http://10.9.154.236:3000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Content:</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setContent(text)}
        value={content}
      />
      <Text>Image:</Text>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
}
