import { useState } from "react";
import * as React from "react";
import Modal from "react-native-modal";
import { collection, addDoc } from "firebase/firestore";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import app from "../../app.json";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";
import { db } from "../firebase";

function CreateMember({ navigation }) {
  const { data } = useGetAll("members");
  const [newFirstname, setFirstname] = useState("");
  const [newLastname, setLastname] = useState("");
  const [color, setFavColor] = useState("");
  const [member] = useState(null);
  const [error] = useState(false);
  const styles = createStyles({
    error,
    member: Boolean(member),
  });
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
    </View>
  );

  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);

  const errorModal = () => setIsErrorModalVisible(() => !isErrorModalVisible);

  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    React.useState(false);

  const successModal = () =>
    setIsSuccessModalVisible(() => !isSuccessModalVisible);

  const onChangeFirstname = (firstnameChange) => {
    setFirstname(firstnameChange);
  };
  const onChangeLastname = (lastnameChange) => {
    setLastname(lastnameChange);
  };
  const onChangeColor = (colorChange) => {
    setFavColor(colorChange);
  };

  const Create = () => {
    const value = newFirstname + " " + newLastname;
    if (value.length > 0 && data?.length > 0) {
      const found = data.find(({ lastname, firstname }) =>
        value.match(
          new RegExp(
            `(${firstname} ${lastname})|(${lastname} ${firstname})`,
            "i"
          )
        )
      );
      if (!found) {
        addDoc(collection(db, "members"), {
          firstname: newFirstname.trim(),
          lastname: newLastname.trim(),
          favoriteColor: color.toLowerCase().trim(),
        });
        successModal();
      } else {
        errorModal();
      }
    }
  };

  const Login = () => {
    navigation.navigate("Identification");
  };

  return (
    <View style={styles.root}>
      {header}
      <View style={styles.content}>
        <TextInput
          placeholder="firstname"
          style={styles.input}
          value={newFirstname}
          onChangeText={onChangeFirstname}
        />
        <TextInput
          placeholder="lastname"
          style={styles.input}
          value={newLastname}
          onChangeText={onChangeLastname}
        />
        <TextInput
          placeholder="favoriteColor"
          style={styles.input}
          value={color}
          onChangeText={onChangeColor}
        />
        <View style={styles.actions}>
          <Button title="Créer l'utilisateur" onPress={Create} />
          <Modal isVisible={isErrorModalVisible}>
            <View>
              <Text style={styles.textButtonError}>Utilisateur déjà créé!</Text>
            </View>
            <View style={styles.button}>
              <Button title="Fermer" onPress={errorModal} />
            </View>
          </Modal>
          <Modal isVisible={isSuccessModalVisible}>
            <View>
              <Text style={styles.textButtonSuccess}>
                Utilisateur créé avec succès!
              </Text>
            </View>
            <View style={styles.button}>
              <Button title="Fermer" onPress={successModal} />
            </View>
          </Modal>
        </View>
        <View style={styles.actions}>
          <Button title="S'identifier" onPress={Login} />
        </View>
      </View>
    </View>
  );
}

export default CreateMember;

const createStyles = ({ error, member }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    header: {
      flexDirection: error || member ? "row" : "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: error || member ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: error || member ? 12 : 32,
      fontWeight: "700",
    },
    logo: {
      height: error || member ? 32 : 192,
      width: error || member ? 32 : 192,
      marginLeft: error || member ? 8 : 0,
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
    actions: {
      marginVertical: 16,
    },
    textButtonError: {
      color: "red",
      fontSize: 20,
      alignSelf: "center",
    },
    textButtonSuccess: {
      color: "green",
      fontSize: 20,
      alignSelf: "center",
    },
    button: {
      backgroundColor: "white",
    },
  });
