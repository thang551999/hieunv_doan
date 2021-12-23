import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Checkbox from "expo-checkbox";
import { createForms,deleteForm } from "@api";
import { DeleteFormAction } from "../../redux/action";
import { getForm } from "../../../api";
import _ from "lodash";

var nameField = "";
export default function formDetails({ navigation, route }) {
  const [name, setName] = useState("");
  const [formInput, setFormInput] = useState([]);
  const { groups, token } = useSelector((store) => store.login);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeField, setTypeField] = useState("");
  const [value, setValueField] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const dispathReload = (note) => dispatch(DeleteFormAction(note));
  const [dataForm, setDataForm] = useState({});
  const [groupRole, setGroupRole] = useState(
    groups.map((e) => {
      return {
        groupsForm: [
          { groups: e.group.id, role: "G", selected: false },
          { groups: e.group.id, role: "U", selected: false },
          { groups: e.group.id, role: "D", selected: false },
        ],
      };
    })
  );
  const onDeleteForm = async () => {
    try {
     await deleteForm(dataForm.id, token);
     alert("Bạn xoá thành công");
     navigation.replace("ListForm")
    } catch (error) {
      console.log(error);
      alert("Bạn không được cấp quyền xoá ");
    }
    
  };
  const onLoadForm = async () => {
    try {
      const { formId } = route.params;
      const data = await getForm(token, formId);
      setDataForm(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderStatusBar = () => {
    if (Platform.OS === "ios") {
      return <SafeAreaView style={styles.topSafeArea} />;
    } else {
      return (
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgb(37, 150, 190)"
          translucent={true}
        />
      );
    }
  };
  useEffect(() => {
    onLoadForm();
  }, [token]);

  const Header = ({ navigation }) => {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: "rgb(37, 150, 190)",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          marginTop: 29,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("@assets/back.png")} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: "white",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Chi tiết biểu mẫu
        </Text>
      </View>
    );
  };

  const formType = [
    {
      label: "Number",
    },
    {
      label: "BarCode",
    },
    {
      label: "Text",
    },
    {
      label: "Date",
    },
  ];

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("@assets/background.jpeg")}
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
        />
        {renderStatusBar()}
        <SafeAreaView style={styles.container}>
          <Header navigation={navigation}></Header>
          {!_.isEmpty(dataForm) && (
            <View style={{ flex: 1 , paddingHorizontal:5}}>
              <View
                style={{
                  borderBottomColor: "rgb(37, 150, 190)",
                  borderBottomWidth: 2,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "700",
                    margin: 10,
                    color: "white",
                  }}
                >
                  Tên Biểu Mẫu: {dataForm.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    margin: 10,
                    color: "white",
                  }}
                >
                  Ngày tạo biểu mẫu :{" "}
                  {new Date(dataForm.createdAt).toLocaleString()}
                </Text>
                {dataForm.createdAt != dataForm.updatedAt && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "400",
                      margin: 10,
                      color: "white",
                    }}
                  >
                    Ngày cập nhật :{" "}
                    {new Date(dataForm.createdAt).toLocaleString()}
                  </Text>
                )}
              </View>
              <ScrollView style={{ flex: 1 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "700",
                      margin: 10,
                      color: "white",
                    }}
                  >
                    Các trường:{" "}
                  </Text>
                  {dataForm.formInput.map((e, index) => (
                    <View
                      style={{
                        backgroundColor: "white",
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text>
                        {index + 1}. Tên: {e?.label}
                      </Text>
                      <Text>Kiểu kiểu dữ liệu : {e?.type}</Text>
                    </View>
                  ))}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "700",
                      margin: 10,
                      color: "white",
                    }}
                  >
                    Cấp quyền cho các Group :{" "}
                  </Text>
                  {dataForm.groupsForm.map((e, index) => {
                    return (
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "200",
                            margin: 2,
                            color: "white",
                            paddingHorizontal:5
                          }}
                        >
                          {e.groups.name} : {e.role}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("EditForm", { form: dataForm});
               
              }}
            >
              <Text style={styles.loginText}>Edit Form</Text>
              <Image
                source={require("@assets/pen1.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                Alert.alert("Bạn chắc chắn muốn xoá biểu mẫu", "", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => onDeleteForm() },
                ])
              }
            >
              <Text style={styles.loginText}>Xoá Form</Text>
              <Image
                style={{ marginLeft: 5 }}
                source={require("@assets/trash1.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginText: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 20,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
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
  item: {
    height: 40,
    backgroundColor: "white",
    margin: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
});
