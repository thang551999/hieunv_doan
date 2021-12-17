import React, {useRef} from 'react';
import {Text, View, StyleSheet, Image, Animated} from 'react-native';

import CardItem from './CardItem';

const FlatlistComponent = ({navigation,data,loadmore, userCode,authenticationToken}) => {
  const scroolY = useRef(new Animated.Value(0)).current;
  return (
    <View>
       
    <Animated.FlatList
   
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scroolY}}}], {
        useNativeDriver: true,
      })}
      data={data}
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
  onEndReachedThreshold={0.5}
      onEndReached={loadmore}
      keyExtractor={(item) => item.id.toString()}
    />
    </View>
  );
};

const Data = [
  {id: 10, image: '', name: 'Test1', compamy: 'NSMV', jobtitle: 'Developer'},
];
function dummydata(obj) {
  let arr = [obj];
  let a = new Object();
  for (let i = 0; i < 30; i++) {
    arr[i] = new Object();
    arr[i].id = i;
    arr[i].image = '';
    arr[i].name = 'Test1' + i;
    arr[i].compamy = 'NSMV' + i;
    arr[i].jobtitle = 'Develo11111111111111111111per';
  }
  return arr;
}
export default FlatlistComponent;
