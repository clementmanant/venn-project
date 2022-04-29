import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Avatar from "./Avatar";
import useRotationColor from "../hooks/useRotationColor";

function Greetings({ firstname, lastname }) {
  const color = useRotationColor();
  const navigation = useNavigation();
  const onNavigateToMembers = () => {
    navigation.navigate("Accueil", { screen: "Membres" });
  };
  const styles = createStyles({
    color,
  });
  return (
    <>
      <TouchableOpacity onPress={onNavigateToMembers}>
        <Avatar label={firstname?.[0]} color={color} />
      </TouchableOpacity>
      <Text style={styles.root}>
        Bienvenu·e {firstname} {lastname} ! 👋
      </Text>
    </>
  );
}

export default Greetings;

const createStyles = ({ color }) =>
  StyleSheet.create({
    root: {
      color,
      fontSize: 24,
      fontWeight: "700",
      paddingHorizontal: 32,
      textAlign: "center",
      marginVertical: 16,
    },
  });
