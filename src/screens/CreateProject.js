import { useState } from "react";
import * as React from "react";
import Modal from "react-native-modal";
import { collection, addDoc } from "firebase/firestore";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../components/Button";
import { db } from "../firebase";

function CreateProject({ navigation }) {
  const [newTitle, setTitle] = useState("");
  const [newTag, setTag] = useState("");
  const [newPartenaire, setPartenaire] = useState("");
  const [member] = useState(null);
  const [error] = useState(false);
  const styles = createStyles({
    error,
    member: Boolean(member),
  });

  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);

  const errorModal = () => setIsErrorModalVisible(() => !isErrorModalVisible);

  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    React.useState(false);

  const successModal = () =>
    setIsSuccessModalVisible(() => !isSuccessModalVisible);

  const onChangeTitle = (titleChange) => {
    setTitle(titleChange);
  };
  const onChangeTag = (tagChange) => {
    setTag(tagChange);
  };
  const onChangePartenaire = (partenaireChange) => {
    setPartenaire(partenaireChange);
  };

  const onNavigateToHome = () => {
    navigation.navigate("Accueil");
  };

  const Create = () => {
    if (newTitle.trim() !== "") {
      addDoc(collection(db, "projects"), {
        title: newTitle.trim(),
        tag: newTag.toLowerCase().trim(),
        partenaire: newPartenaire.trim(),
      });
      successModal();
    } else {
      errorModal();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={newTitle}
          onChangeText={onChangeTitle}
        />
        <TextInput
          placeholder="Tag"
          style={styles.input}
          value={newTag}
          onChangeText={onChangeTag}
        />
        <TextInput
          placeholder="Partenaire"
          style={styles.input}
          value={newPartenaire}
          onChangeText={onChangePartenaire}
        />
        <View style={styles.actions}>
          <Button title="Créer le projet" onPress={Create} />
          <Modal isVisible={isErrorModalVisible}>
            <View>
              <Text style={styles.textButtonError}>
                Veuillez rentrer un nom valide!
              </Text>
            </View>
            <View style={styles.button}>
              <Button title="Fermer" onPress={errorModal} />
            </View>
          </Modal>
          <Modal isVisible={isSuccessModalVisible}>
            <View>
              <Text style={styles.textButtonSuccess}>
                Projet créé avec succès!
              </Text>
            </View>
            <View style={styles.button}>
              <Button title="Fermer" onPress={successModal} />
            </View>
          </Modal>
        </View>
        <View style={styles.button}>
          <Button title="Annuler" onPress={onNavigateToHome} />
        </View>
      </View>
    </View>
  );
}

export default CreateProject;

const createStyles = ({ error, member }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    content: {
      flexGrow: error || member ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
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
