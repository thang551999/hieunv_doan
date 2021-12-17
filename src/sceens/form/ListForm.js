import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { getForms } from "../../../api/index";
import FlatlistComponent from "../../../component/ListCard";
import { useSelector } from "react-redux";

export default function ListForm({ navigation }) {
  const token = useSelector((store) => store.login);
  const [forms, setForms] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const getForm = async () => {
    if (token.token) {
      const dataForms = await getForms(token.token);
      setForms(dataForms.data);
    }
  };
  useEffect(() => {
    getForm();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("@assets/background.jpeg")}
        style={StyleSheet.absoluteFillObject}
        blurRadius={18}
      />
      <SafeAreaView>
        <TextInput
          placeholder="Tìm kiếm biểu mẫu ..."
          style={{
            backgroundColor: "white",
            margin: 15,
            height: 50,
            padding: 15,
            borderRadius: 20,
          }}
        ></TextInput>
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "800",
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          Danh sách biểu mẫu{" "}
        </Text>
        <FlatlistComponent data={forms} />

        <TouchableOpacity
          style={styles.buttonfloat}
          onPress={() => {
            navigation.navigate("CreateForm");
          }}
        >
          <Image
            source={require("@assets/plus.png")}
            style={styles.callPhone}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonfloat: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgb(37, 150, 190)",
    position: "absolute",
    bottom: 150,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    height: 40,
    flexDirection: "row",
  },
  item: {
    height: 40,
    backgroundColor: "white",
    margin: 10,
  },
});
