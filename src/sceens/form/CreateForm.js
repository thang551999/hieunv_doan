import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Checkbox from "expo-checkbox";
import { createForms } from "@api";
import { DeleteFormAction } from "../../redux/action";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

var nameField = "";
export default function CreateForms({ navigation }) {
  const [name, setName] = useState("");
  const [formInput, setFormInput] = useState([]);
  const { groups, token } = useSelector((store) => store.login);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeField, setTypeField] = useState("");
  const [value, setValueField] = useState("");
  const [textNameError, setTextNameError] = useState("");
  const [textFormInputError, setTextFormInputError] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const dispathReload = (note) => dispatch(DeleteFormAction(note));
  const [groupRole, setGroupRole] = useState(
    groups.map((e) => {
      return {
        groupsForm: [
          { groups: e.group.id, role: "G", selected: true },
          { groups: e.group.id, role: "U", selected: false },
          { groups: e.group.id, role: "D", selected: false },
        ],
      };
    })
  );
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
        <TouchableOpacity onPress={() => navigation.replace("ListForm")}>
          <Image source={require("@assets/back.png")} />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => onCreateForm()}
        >
          <Image source={require("@assets/check.png")} />
        </TouchableOpacity>
      </View>
    );
  };
  const onCreateForm = async () => {
    const groupR = JSON.parse(JSON.stringify(groupRole)).map((e) => {
      return e.groupsForm.filter((val) => val.selected === true);
    });
    let body;
    if (groupR.flat().length !== 0) {
      const groupsForm = groupR.flat().map((e) => {
        return { groups: e.groups, role: e.role };
      });
      body = {
        name,
        formInput,
        groupsForm,
      };
    } else {
      body = {
        name,
        formInput,
      };
    }
    try {
      if (name && formInput.length != 0) {
        const data = await createForms(token, body);
        alert("Ban Tao thanh cong form ");
        setName(""), setFormInput([]);
        setGroupRole(
          groups.map((e) => {
            return {
              groupsForm: [
                { groups: e.group.id, role: "G", selected: true },
                { groups: e.group.id, role: "U", selected: false },
                { groups: e.group.id, role: "D", selected: false },
              ],
            };
          })
        );
        navigation.replace("ListForm");
        (nameField = ""), setName("");
      } else if (!name) {
        setTextNameError("Tên biểu mẫu không được bỏ trống.");
      } else {
        setTextFormInputError("Biểu mẫu phải điền ít nhất 1 trường.");
      }
    } catch (error) {
      alert("Ban thu lai sau");
    }
  };
  const Footer = () => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: "rgb(37, 150, 190)",
          justifyContent: "center",
          marginTop: 10,
        }}
        onPress={() => {
          if (modalVisible) {
            const formInputs = {
              label: nameField,
              value: value,
              type: typeField,
            };

            setFormInput([...formInput, formInputs]);
            setModalVisible(false);
            nameField = "";
          } else {
            setModalVisible(true);
          }
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
      </TouchableOpacity>
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

  const containerStyle = { backgroundColor: "white", padding: 20 };
  const ModalField = () => {
    return (
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={containerStyle}
          // dismissable={false}
        >
          <Text>Tên trường :</Text>
          <TextInput
            onChangeText={(text) => (nameField = text)}
            style={{
              margin: 5,
              backgroundColor: "white",
              borderWidth: 1,
              padding: 10,
              height: 50,
              marginHorizontal: 10,
              borderRadius: 10,
            }}
          >
            {nameField}
          </TextInput>
          <Text stye={{ margin: 5 }}>Kiểu :</Text>
          {/* <RadioButtonRN
            data={formType}
            selectedBtn={(e) => setTypeField(e.label)}
          /> */}
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10 }}
            selected={typeField}
            onSelected={(value) => setTypeField(value)}
            radioBackground="green"
          >
            <RadioButtonItem
              value="Number"
              style={{ margin: 10 }}
              label={"Number"}
            />
            <RadioButtonItem
              value="BarCode"
              style={{ margin: 10 }}
              label={"BarCode"}
            />
            <RadioButtonItem
              value="Text"
              style={{ margin: 10 }}
              label={"Text"}
            />
            <RadioButtonItem
              value="Date"
              style={{ margin: 10 }}
              label={"Date"}
            />
          </RadioButtonGroup>
          <Footer></Footer>
        </Modal>
      </Portal>
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Image
          source={require("@assets/background.jpeg")}
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
        />
        <SafeAreaView style={styles.container}>
          {renderStatusBar()}
          <Header navigation={navigation}></Header>
          <View style={{ flex: 1 }}>
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
                Tên Biểu Mẫu:
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  height: 50,
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}
              ></TextInput>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  marginTop: 5,
                  marginLeft: 5,
                  color: "red",
                }}
              >
                {textNameError}
              </Text>
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
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    marginTop: 5,
                    marginLeft: 5,
                    color: "red",
                  }}
                >
                  {textFormInputError}
                </Text>
                {formInput.map((e, index) => (
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
                {groups.map((e, index) => {
                  return (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "200",
                          margin: 2,
                          color: "white",
                        }}
                      >
                        {e.group.name} :{" "}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Checkbox
                          style={{ margin: 10 }}
                          value={groupRole[index].groupsForm[0].selected}
                          onValueChange={(val) => {
                            let groupRoleClone = JSON.parse(
                              JSON.stringify(groupRole)
                            );
                            groupRoleClone[index].groupsForm[0].selected = val;
                            setGroupRole(groupRoleClone);
                          }}
                          color={
                            groupRole[index].groupsForm[0].selected
                              ? "#4630EB"
                              : "white"
                          }
                        />
                        <Text style={{ color: "white" }}>Get</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Checkbox
                          style={{ margin: 10 }}
                          value={groupRole[index].groupsForm[1].selected}
                          onValueChange={(val) => {
                            let groupRoleClone = JSON.parse(
                              JSON.stringify(groupRole)
                            );
                            groupRoleClone[index].groupsForm[1].selected = val;
                            setGroupRole(groupRoleClone);
                          }}
                          color={
                            groupRole[index].groupsForm[1].selected
                              ? "#4630EB"
                              : "white"
                          }
                        />
                        <Text style={{ color: "white" }}>Update</Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Checkbox
                          style={{ margin: 10 }}
                          value={groupRole[index].groupsForm[2].selected}
                          onValueChange={(val) => {
                            let groupRoleClone = JSON.parse(
                              JSON.stringify(groupRole)
                            );
                            groupRoleClone[index].groupsForm[2].selected = val;
                            setGroupRole(groupRoleClone);
                          }}
                          color={
                            groupRole[index].groupsForm[2].selected
                              ? "#4630EB"
                              : "white"
                          }
                        />
                        <Text style={{ color: "white" }}>Delete</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <ModalField />
          {!modalVisible && <Footer></Footer>}
        </SafeAreaView>
      </View>
    </Provider>
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
  checkbox: {
    alignSelf: "center",
  },
});
