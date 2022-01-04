import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import { getForms, searchForms } from "../../../api/index";
import FlatlistComponent from "../../../component/ListCard";
import { useSelector } from "react-redux";

export default function ListForm({ navigation }) {
  const token = useSelector((store) => store.login);
  const { reload } = useSelector((store) => store.formReducer);
  const [forms, setForms] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingListForm, setLoadingForm] = useState(false);
  const getForm = async () => {
    setLoading(true);
    if (token.token) {
      const dataForms = await getForms(token.token, 1);
      setForms(dataForms.data);
    }
    setLoading(false);
  };
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
  const loadMore = async () => {
    if(isSearch){
      setLoadingForm(true);
      const dataForms = await searchForms(
        token.token,
        
        Math.floor(forms.length / 10) + 1,
        textSearch,
      );
      console.log(dataForms.data, Math.floor(forms.length / 10) + 1);
      if (dataForms.data.length < 10 && forms.length % 10 != 0) {
      } else {
        const newData = [...forms, ...dataForms.data];
        setForms(newData);
      }
      await setTimeout(() => setLoadingForm(false), 500);
    }else {
    if (!loadingListForm) {
      setLoadingForm(true);
      const dataForms = await getForms(
        token.token,
        Math.floor(forms.length / 10) + 1
      );
      if (dataForms.data.length < 10 && forms.length % 10 != 0) {
      } else {
        const newData = [...forms, ...dataForms.data];
        setForms(newData);
      }
      await setTimeout(() => setLoadingForm(false), 500);
    }}
  };
  useEffect(() => {
    getForm();
  }, [token.token, reload]);
  const onSearch = async () => {
    setIsSearch(true);
    const data = await searchForms(token.token, 1, textSearch);
    console.log(data.data);
    setForms(data.data)
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
      }}
    >
      <Image
        source={require("@assets/background.jpeg")}
        style={StyleSheet.absoluteFillObject}
        blurRadius={18}
      />
      <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
        {renderStatusBar()}
        <TextInput
          value={textSearch}
          placeholder="Tìm kiếm biểu mẫu ..."
          style={{
            backgroundColor: "white",
            margin: 15,
            height: 50,
            padding: 15,
            borderRadius: 20,
          }}
          onChangeText={(text) => setTextSearch(text)}
          onSubmitEditing={() => onSearch()}
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
          Danh sách biểu mẫu
        </Text>
        <View style={{ flex: 1 }}>
          {loading && (
            <ActivityIndicator
              style={{ justifyContent: "center" }}
              size="large"
              color="white"
            />
          )}
          {!loading && (
            <FlatlistComponent
              data={forms}
              navigation={navigation}
              loadMore={loadMore}
              loading={loadingListForm}
            />
          )}
        </View>
        <View>
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
        </View>
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
    bottom: 40,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  topSafeArea: {
    flex: 0,
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
