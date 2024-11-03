import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapes}>
        <View style={styles.circle} />
        <View style={styles.rectangle} />
        <View style={styles.triangle} />
      </View>
      <View style={styles.content}>
        <Ionicons name="alert-circle-outline" size={48} color="#DE0000" />
        <Text style={styles.title}>Error</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.message}>Please try again later</Text>
      </View>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backgroundShapes: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFDDC1",
    position: "absolute",
    top: -50,
    left: -50,
  },
  rectangle: {
    width: 300,
    height: 100,
    backgroundColor: "#C1E1FF",
    position: "absolute",
    bottom: -50,
    right: -50,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFC1C1",
    position: "absolute",
    bottom: -50,
    left: 50,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
    color: "#DE0000",
  },
  message: {
    fontSize: 18,
    marginTop: 8,
    color: "#666",
    textAlign: "center",
  },
});
