import { View, Text, StyleSheet } from "react-native";

function Project({ title, tag, partenaire }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Projet : {title}</Text>
      <Text style={styles.title}>Tag : {tag}</Text>
      <Text style={styles.title}>Avec : {partenaire}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  avatars: {
    flexDirection: "row",
  },
  avatar: {
    margin: 8,
  },
});

export default Project;
