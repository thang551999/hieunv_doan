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
import { useSelector,useDispatch } from "react-redux";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
import Checkbox from "expo-checkbox";
import {createForms} from '@api'
import {DeleteFormAction} from '../../redux/action'

var nameField = "";
export default function formDetails({navigation}) {
  const [name, setName] = useState("");
  const [formInput, setFormInput] = useState([]);
  const { groups,token} = useSelector((store) => store.login);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeField, setTypeField] = useState("");
  const [value, setValueField] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const dispathReload = (note) => dispatch(DeleteFormAction(note));
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
            flex:1,
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
  const onCreateForm = async() => {
    const groupR = JSON.parse(JSON.stringify(groupRole)).map((e) => {
      return e.groupsForm.filter((val) => val.selected === true);
    });

    
    let body
    if (groupR.flat().length !== 0) {
      const groupsForm = groupR.flat().map((e) => {
        return { groups: e.groups, role: e.role };
      });
       body ={
        name,
        formInput,
        groupsForm
      }
    }else{
       body ={
        name,
        formInput,
      }
    }
   try {
     const data = await createForms(token,body)
     alert('Ban Tao thanh cong form ')
     navigation.push('ListForm')
   } catch (error) {
    alert('Ban thu lai sau')
   }
    console.log(body,93);

    // const groupsForms =groupRole.groupsForm.map(groupF=>{

    // })
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
          <RadioButtonRN
            data={formType}
            selectedBtn={(e) => setTypeField(e.label)}
          />
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
          <Header></Header>
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
