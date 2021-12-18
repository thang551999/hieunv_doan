import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  Platform,
  Modal,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as StringCommon from "@common/CommonString";
import * as Constant from "@common/StylesCommon";
import { Button } from "react-native-paper";
import { login } from "@api";
import { LoginAction } from "../../redux/action";

export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("thangdp");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dispathLogin = (note) => dispatch(LoginAction(note));
  const renderStatusBar = () => {
    if (Platform.OS === "ios") {
      return <SafeAreaView style={styles.topSafeArea} />;
    } else {
      return (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
      );
    }
  };
  const doLogin = async () => {
    setLoading(true);
    try {
      const data = await login(userName, password);
    if (!data.data?.token) {
      alert(data.data);
    } else {
      dispathLogin(data.data)
      navigation.navigate("ListForm");
    }
    } catch (error) {
      alert(error)
    }
    
    setLoading(false);
  };
  const renderShowHidePassword = () => {
    if (showPassword == false) {
      return (
        <View style={styles.cssPassword}>
          <TouchableOpacity
            style={styles.centerIcon}
            onPress={() => {
              setShowPassword(true);
            }}
          >
            <Image
              source={require("@assets/showPassword.png")}
              style={styles.sizeIconPassword}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.cssPassword}>
          <TouchableOpacity
            style={styles.centerIcon}
            onPress={() => {
              setShowPassword(false);
            }}
          >
            <Image
              source={require("@assets/hidePassword.png")}
              style={styles.sizeIconPasswordShow}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("@assets/background.jpeg")}
          style={[styles.container]}
          blurRadius={150}
        >
          {renderStatusBar}
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "700", color: "ivory" }}>
                Quản lý forms
              </Text>
            </View>

            <View style={[styles.body, { flex: 2 }]}>
              <View style={styles.inputContainer}>
                <View style={[styles.styleTextInput, { flexDirection: "row" }]}>
                  <Image
                    source={require("@assets/username.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginHorizontal: 10,
                    }}
                  ></Image>
                  <TextInput
                  value={userName}
                    placeholder={StringCommon.Place_Holder_User}
                    onChangeText={(userCode) => setUserName(userCode)}
                    placeholderTextColor="#C9E3F5"
                    autoCapitalize="none"
                    // onSubmitEditing={() => {
                    //   this.refs.inputPassword.focus();
                    // }}
                    style={styles.textInputLogin}
                  />
                </View>
                <View style={[styles.styleIconInput]}>
                  <TouchableOpacity
                    style={styles.centerIcon}
                    // onPress={() => {
                    //   this.refs.inputUser.clear();
                    // }}
                  >
                    <Image
                      source={require("@assets/clearData.png")}
                      style={styles.sizeIcon}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.styleTextInput, { flexDirection: "row" }]}>
                  <Image
                    style={{ height: 30, width: 30, marginHorizontal: 10 }}
                    source={require("@assets/password.png")}
                  ></Image>
                  <TextInput
                  value={password}
                    // ref="inputPassword"
                    // editable={this.state.doConnecting === true ? false : true}
                    placeholder={StringCommon.Place_Holder_Password}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    placeholderTextColor="#C9E3F5"
                    // onSubmitEditing={() => {
                    //   this.doLogin(this.state.userCode, this.state.password);
                    // }}
                    style={styles.textInputLogin}
                  />
                </View>
                {renderShowHidePassword}
                <View style={styles.styleIconInput}>
                  <TouchableOpacity
                    style={styles.centerIcon}
                    // onPress={() => {
                    //   this.refs.inputPassword.clear();
                    // }}
                  >
                    <Image
                      source={require("@assets/clearData.png")}
                      style={styles.sizeIcon}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                contentStyle={styles.buttoncontent}
                icon={({}) => (
                  <Image
                    source={require("@assets/iconlogin.png")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
                style={styles.buttonContainer}
                mode="contained"
                onPress={() => doLogin()}
                loading={loading}
              >
                <Text style={styles.loginText}>{StringCommon.Title_Login}</Text>
              </Button>
              <Text style={{ margin: 50, color: "white" }}>Version 1.0</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    // width: Constant.width7Unit,
    height: 50,
    // top: Constant.height3Unit,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(37, 150, 190)",
    borderRadius: 30,

    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    // padding: 10,
  },
  loginText: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 20,
  },
  buttoncontent: {
    height: 50,
    width: Constant.width7Unit,
  },
  styleIconInput: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  styleTextInput: {
    flex: 8,
    alignItems: "center",
  },

  textInputLogin: {
    flex: 1,
    color: "white",
    textAlignVertical: "center",
  },

  cssPassword: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundColorDafault: {
    backgroundColor: "#7092BE",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  centerIcon: {
    alignItems: "center",
    justifyContent: "center",
  },

  sizeIcon: {
    width: 13,
    height: 13,
  },

  sizeIconPassword: {
    width: 17,
    height: 17,
  },

  sizeIconPasswordShow: {
    width: 23,
    height: 23,
  },

  containerModal: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },

  bodyModal: {
    height: 100,
    width: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    opacity: 2,
    borderRadius: 15,
  },

  textModal: {
    color: "black",
    marginBottom: 10,
  },

  header: {
    height: 70,
    backgroundColor: "#7092BE",
    justifyContent: "center",
  },

  titleHeader: {
    color: "white",
    left: Constant.widthUnit,
    fontSize: 25,
  },

  body: {
    alignItems: "center",
  },

  inputContainer: {
    width: Constant.width10Unit,
    height: 50,
    // top: Constant.height2Unit,
    justifyContent: "center",
    // borderBottomColor: '#BC9175',
    // borderBottomWidth: 2,

    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    margin: 10,
    borderRadius: 20,
  },

  loginText: {
    color: "white",
  },

  topSafeArea: {
    flex: 0,
  },
});
