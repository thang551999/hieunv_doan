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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Checkbox from "expo-checkbox";
import { createForms } from "@api";
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
  const onLoadForm = async () => {
    try {
      const { formId } = route.params;
      console.log(formId);
      const data = await getForm(token, formId);
      console.log(data.data, 39);
      setDataForm(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLoadForm();
  }, [token]);

  const Header = () => {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: "rgb(37, 150, 190)",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image source={require("@assets/back.png")} />
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
      <View style={styles.container}>
        <Image
          source={require("@assets/background.jpeg")}
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
        />
        <SafeAreaView style={styles.container}>
          <Header></Header>
          {!_.isEmpty(dataForm) && (
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
