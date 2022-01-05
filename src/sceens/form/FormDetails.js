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
  Alert,
  TextInput,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Checkbox from "expo-checkbox";
import { createForms, deleteForm } from "@api";
import { DeleteFormAction } from "../../redux/action";
import { getForm, submitForm } from "../../../api";
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
  const [isDelete, setIsDete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [formData, setFormData] = useState(dataForm.formInput);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
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
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const onDeleteForm = async () => {
    try {
      await deleteForm(dataForm.id, token);
      alert("Bạn xoá thành công");
      navigation.replace("ListForm");
    } catch (error) {
      alert("Bạn không được cấp quyền xoá ");
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const onSubmit = async () => {
    try {
      console.log(formData);
      const body = {
        name: dataForm.name,
        formInput: formData,
      };
      const data = {
        data: JSON.stringify(body),
      };
      await submitForm(token, data);
      alert("Bạn gửi  thành công");
      navigation.replace("ListForm");
    } catch (error) {
      alert("Bạn không được cấp quyền xoá ");
    }
  };
  const onLoadForm = async () => {
    try {
      const { formId } = route.params;
      const data = await getForm(token, formId);
      setDataForm(data.data);
      const checkUpdate = data.data.groupsForm.find((e) => e.role == "U");
      const checkDel = data.data.groupsForm.find((e) => e.role == "D");
      if (checkUpdate) {
        setIsUpdate(true);
      }
      if (checkDel) {
        setIsDete(true);
      }
    } catch (error) {}
  };
  const renderStatusBar = () => {
    if (Platform.OS === "ios") {
      return <SafeAreaView style={styles.topSafeArea} />;
    } else {
      return <StatusBar barStyle="light-content" translucent={true} />;
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
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.replace("ListForm")}>
          <Image size={20} source={require("@assets/back.png")} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: "white",
            marginRight: 20,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Chi tiết biểu mẫu
        </Text>
      </View>
    );
  };
  const onSubmitEdit = (e, index) => {
    let newdataForm = JSON.parse(JSON.stringify(dataForm.formInput));
    console.log(e, index);
    newdataForm.splice(index, 1);
    newdataForm.push(e);
    setFormData(newdataForm);
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
          {scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ flex: 1 }}
            />
          )}
          {!_.isEmpty(dataForm) && (
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "700",
                    margin: 10,
                    color: "white",
                  }}
                >
                  {dataForm.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    textAlign: "right",
                    margin: 10,
                    color: "white",
                  }}
                >
                  {new Date(dataForm.createdAt).toLocaleString()}
                </Text>
              </View>
              <ScrollView style={{ flex: 1 }}>
                <View>
                  {dataForm.formInput.map((e, index) => (
                    <>
                      <View
                        style={{
                          backgroundColor: "white",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: 10,
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>{e?.label}</Text>
                        <Text style={{ fontSize: 20, color: "blue" }}>
                          {e?.type}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          padding: 10,
                          borderRadius: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "white" }}>Value:</Text>
                        {e.type == "Number" && (
                          <TextInput
                            placeholder="Value"
                            onChangeText={(text) => {
                              e.value = text;
                            }}
                            style={styles.textView}
                            keyboardType="numeric"
                            returnKeyType="done"
                            onSubmitEditing={(e, index) =>
                              onSubmitEdit(e, index)
                            }
                          ></TextInput>
                        )}
                        {e.type == "Text" && (
                          <TextInput
                            placeholder="Value"
                            onChangeText={(text) => {
                              e.value = text;
                            }}
                            style={styles.textView}
                            returnKeyType="done"
                            onSubmitEditing={(e, index) =>
                              onSubmitEdit(e, index)
                            }
                          ></TextInput>
                        )}
                        {e.type == "Date" && (
                          <>
                          <TextInput
                            placeholder="Value"
                            onChangeText={(text) => {
                              e.value = text;
                            }}
                            style={styles.textView}
                            returnKeyType="done"
                            onTouchStart={()=>{setShow(true)
                            }}
                            onSubmitEditing={(e, index) =>
                              onSubmitEdit(e, index)
                            }
                          ></TextInput>
                          {/* {show && (
                            <DateTimePicker
                              testID="dateTimePicker"
                              value={date}
                              mode={mode}
                              is24Hour={true}
                              display="default"
                              onChange={onChange}
                            />
                          )} */}
                          </>
                        )}
                        {e.type == "BarCode" && (
                          <>
                            <TextInput
                              placeholder="Value"
                              onChangeText={(text) => {
                                e.value = text;
                              }}
                              style={styles.textView}
                              returnKeyType="done"
                              onSubmitEditing={(e, index) =>
                                onSubmitEdit(e, index)
                              }
                            ></TextInput>
                            {/* <TouchableOpacity
                              onPress={() => {
                                const data = scanned;
                                setScanned(!data);
                              }}
                            >
                              <Image
                                style={{ height: 60, margin: 20 }}
                                source={require("@assets/imageforms.png")}
                                resizeMode="contain"
                              />
                            </TouchableOpacity> */}
                          </>
                        )}
                      </View>
                    </>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={() =>
              Alert.alert("Bạn chắc chắn muốn gửi biểu mẫu", "", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => onSubmit() },
              ])
            }
          >
            <Text style={styles.loginText}>Send</Text>
            <Image
              style={{ marginLeft: 5 }}
              source={require("@assets/send.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {isUpdate && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  navigation.navigate("EditForm", { form: dataForm });
                }}
              >
                <Text style={styles.loginText}>Edit Form</Text>
                <Image
                  source={require("@assets/pen1.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {isDelete && (
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
            )}
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
  buttonSend: {
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
  textView: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
  },
});
