import React, { useRef, useState ,useEffect} from "react";
import { Text, View, ActivityIndicator, Image, Animated } from "react-native";
import { useSelector } from "react-redux";
import { getForms } from "../api";

import CardItem from "./CardItem";

const FlatlistComponent = ({
  navigation,
  data,
  userCode,
  authenticationToken,
  loading,
  loadMore
}) => {
  const scroolY = useRef(new Animated.Value(0)).current;
  // const [loading, setLoading] = useState(false);
  const [dataState, setDataState] = useState(data);
  const token = useSelector((store) => store.login);
  useEffect(() => {
   setDataState(data)
  }, [data])
  return (
    <View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroolY } } }],
          {
            useNativeDriver: true,
          }
        )}
        data={dataState}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "white" }}>
            Chưa có biểu mẫu
          </Text>
        }
        renderItem={(item, index) => {
          return (
            <CardItem
              item={item}
              index={item.index}
              scroolY={scroolY}
              navigation={navigation}
              authenticationToken={authenticationToken}
              userCode={userCode}
            />
          );
        }}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <>
            {loading && (
              <ActivityIndicator
                style={{ justifyContent: "center" }}
                size="large"
                color="white"
              />
            )}
          </>
        )}
      />
    </View>
  );
};

const Data = [
  { id: 10, image: "", name: "Test1", compamy: "NSMV", jobtitle: "Developer" },
];
function dummydata(obj) {
  let arr = [obj];
  let a = new Object();
  for (let i = 0; i < 30; i++) {
    arr[i] = new Object();
    arr[i].id = i;
    arr[i].image = "";
    arr[i].name = "Test1" + i;
    arr[i].compamy = "NSMV" + i;
    arr[i].jobtitle = "Develo11111111111111111111per";
  }
  return arr;
}
export default FlatlistComponent;
