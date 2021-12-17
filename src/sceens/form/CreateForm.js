import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";


export default function CreateForms() {
  const [name,setName]=useState('')
  const [formInput,setFormInput]=useState('')
  const {groups} = useSelector((store) => store.login);

  const Header = () => {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: "rgb(37, 150, 190)",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image source={require("@assets/back.png")} />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Tạo Biểu Mẫu
        </Text>
        <Image source={require("@assets/check.png")} />
      </View>
    );
  };
  const Footer = () => {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: "rgb(37, 150, 190)",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Thêm trường
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/background.jpeg")}
        style={StyleSheet.absoluteFillObject}
        blurRadius={50}
      />
      <SafeAreaView style={styles.container}>
        <Header></Header>
        <View style={{ flex: 1 }}>
          <View>
            <Text>Tên : </Text>
            <TextInput style={{backgroundColor:'white'}}></TextInput>
          </View>
          <View>
            <Text>Quyền Cho Group : </Text>
            <TextInput style={{backgroundColor:'white'}}></TextInput>
          </View>
        </View>
        <Footer></Footer>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 40,
    backgroundColor: "white",
    margin: 10,
  },
});
