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
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Checkbox from "expo-checkbox";
import {
  updateForm,
  deleteFormInput,
  deleteRoleForm,
  createRoleForm,
} from "@api";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import _ from "lodash";

var nameField = "";
const formType = [
  {
    label: "Number",
    value: 1,
  },
  {
    label: "BarCode",
    value: 2,
  },
  {
    label: "Text",
    value: 2,
  },
  {
    label: "Date",
    value: 3,
  },
];
export default function EditForm({ route, navigation }) {
  const [name, setName] = useState("");
  const [formInput, setFormInput] = useState([]);
  const { groups, token } = useSelector((store) => store.login);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFieldVisible, setModalFieldVisible] = useState(false);
  const [typeField, setTypeField] = useState("");
  const [value, setValueField] = useState("");
  const [roleDelete, setRoleDelete] = useState([]);
  const [formInputSelected, setFormInputSelected] = useState({});
  const [current, setCurrent] = useState("test");

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
  const onDeleteFormInput = async (id) => {
    await deleteFormInput(id, token, route.params.form.id);
    const newFormInputs = JSON.parse(JSON.stringify(formInput));
    const index = newFormInputs.findIndex((e) => e.id == id);
    newFormInputs.splice(index, 1);
    setFormInput(newFormInputs);
  };

  const checkRole = async () => {
    // Kiểm tra role ban đầu với role hiện tại
    // Lay role đã xoá quyền
    const deleteRole = groupRole
      .map((e) => e.groupsForm)
      .flat()
      .filter((e) => e.selected == false && e.id != null);
    console.log(deleteRole, 10);
    await Promise.all(
      deleteRole.map((e) => deleteRoleForm(e.id, token, route.params.form.id))
    );
    // Lấy role thêm mới
    const newRole = groupRole
      .map((e) => e.groupsForm)
      .flat()
      .filter((e) => e.selected == true && e.id == null);
    console.log(newRole, 10);
    await Promise.all(
      newRole.map((e) =>
        createRoleForm(e.role, token, route.params.form.id, e.groups)
      )
    );
  };

  const onUpdate = async () => {
    const body = {
      name,
      formInput,
    };
    try {
      const data = await updateForm(token, route.params.form.id, body);
      await checkRole();
      navigation.replace("ListForm");
    } catch (error) {
      alert("Ban khong co quyen");
    }
  };
  const onSubmit = async () => {
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
  };
  useEffect(() => {
    setName(route.params.form.name);
    setFormInput(route.params.form.formInput);
    console.log(groupRole, 133333);
    console.log(route.params.form.groupsForm, 144444);
    const newGroupRole = groupRole.map((e) => {
      const role = e.groupsForm.map((val) => {
        const a = route.params.form.groupsForm.find(
          (e) => e.groups.id == val.groups && e.role == val.role
        );
        // console.log(a,140);
        if (a) {
          return {
            groups: val.groups,
            role: val.role,
            selected: true,
            id: a.id,
          };
        }
        return val;
      });
      return {
        groupsForm: role,
      };
    });

    setGroupRole(newGroupRole);
  }, [token]);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace("ListForm")}>
          <Image source={require("@assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Chỉnh sửa biểu mẫu</Text>
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => onUpdate(navigation)}
        >
          <Image source={require("@assets/check.png")} />
        </TouchableOpacity>
      </View>
    );
  };

  const Footer = () => {
    return (
      <TouchableOpacity style={styles.footer} onPress={() => onSubmit()}>
        <Text style={styles.textHeader}>Thêm trường</Text>
      </TouchableOpacity>
    );
  };

  const containerStyle = { backgroundColor: "white", padding: 20 };
  const ModalField = () => {
    return (
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            nameField = "";
          }}
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
  const ModalFieldEdit = () => {
    return (
      <Portal>
        <Modal
          visible={modalFieldVisible}
          onDismiss={() => {
            setModalFieldVisible(false);
          }}
          contentContainerStyle={containerStyle}
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
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10 }}
            selected={current}
            onSelected={(value) => setCurrent(value)}
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
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "rgb(37, 150, 190)",
              justifyContent: "center",
              marginTop: 10,
              borderRadius: 20,
            }}
            onPress={() => {
              const newFormInputs = JSON.parse(JSON.stringify(formInput));
              const index = newFormInputs.findIndex(
                (e) => e.id == formInputSelected.id
              );
              newFormInputs.splice(index, 1);
              newFormInputs.push({
                id: formInputSelected.id,
                label: nameField,
                type: current,
              });
              setFormInput(newFormInputs);
              setModalFieldVisible(false);
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
              Lưu
            </Text>
          </TouchableOpacity>
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
                Tên Biểu Mẫu:{" "}
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
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <TouchableOpacity onPress={() => onSubmit()}>
                    <Image source={require("@assets/plus.png")} />
                  </TouchableOpacity>
                </View>

                {formInput.map((e, index) => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: "white",
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        flex: 1,
                      }}
                    >
                      <Text>
                        {index + 1}. Tên: {e?.label}
                      </Text>
                      <Text>Kiểu kiểu dữ liệu : {e?.type}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setFormInputSelected(e);
                        setModalFieldVisible(true);
                        nameField = e.label;
                        setCurrent(e.type);
                      }}
                    >
                      <Image
                        style={{ marginHorizontal: 5 }}
                        source={require("@assets/pen1.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert("Bạn Chắc Chắn Muốn Xoá FormInput", "", [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => onDeleteFormInput(e.id),
                          },
                        ]);
                      }}
                    >
                      <Image
                        style={{ marginHorizontal: 5 }}
                        source={require("@assets/trash1.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
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
          <ModalFieldEdit />
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
  header: {
    height: 50,
    backgroundColor: "rgb(37, 150, 190)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 29,
  },
  textHeader: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  footer: {
    height: 50,
    backgroundColor: "rgb(37, 150, 190)",
    justifyContent: "center",
    marginTop: 10,
  },
});
