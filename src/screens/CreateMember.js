import { useContext, useState, useCallback } from "react";
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
import ColorContext from "../ColorContext";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";
import { db } from "../firebase";

function CreateMember({ navigation }) {
  const { data } = useGetAll("members");
  const [, setColor] = useContext(ColorContext);
  const [newFirstname, setFirstname] = useState("");
  const [newLastname, setLastname] = useState("");
  const [color, setFavColor] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
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
        var docRef = addDoc(collection(db, "members"), {
          firstname: newFirstname.trim(),
          lastname: newLastname.trim(),
          favoriteColor: color.toLowerCase().trim(),
        });
      } else {
        // Actualiser BDD + Message d'erreur ou de succès
        console.log("Utilisateur existant");
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
  });
