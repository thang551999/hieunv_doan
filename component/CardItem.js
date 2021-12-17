import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';

const CardItemListView = ({item, index, scroolY, navigation,authenticationToken,userCode}) => {
  const inputreang = [-1, 0, index * 130, (index + 2) * 130];
  const inputreang1 = [-1, 0, index * 130, (index + 1) * 130];
  const opacity = scroolY.interpolate({
    inputRange: inputreang1,
    outputRange: [1, 1, 1, 0],
  });
  const scale = scroolY.interpolate({
    inputRange: inputreang,
    outputRange: [1, 1, 1, 0],
  });
console.log(item.item,10);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scale}],
          opacity: opacity,
        },
      ]}>
      <TouchableOpacity
        style={{flexDirection: 'row', flex: 1}}
        onPress={() => {
          console.log(123)
         
        }}>
        <>
          <Image
            style={{height: 80, flex:1, margin: 20}}
            source={require("@assets/imageforms.png")}
            resizeMode={'cover'}
          />
          <View
            style={{
              flexDirection: 'column',
              flex:2,
              margin:10
            }}>
            <Text style={{fontSize: 20, fontWeight: '700'}} numberOfLines={1}>{item.item.name}</Text>
            <Text style={{color: 'gray', marginTop: 10}} numberOfLines={1}>
              {item.item.name}
            </Text>
            <Text style={{color: 'gray', marginTop: 5}} numberOfLines={1}>
            MTime: {new Date(item.item.createdAt).toLocaleString()}
            </Text>
            {item.phone1==''?(<View></View>):(<View style={{flexDirection: 'row', justifyContent: 'flex-end',marginBottom:5}}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${item.phone1}`);
                }}>
                <Image source={require('@assets/pen1.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`sms:${item.phone1}`);
                }}>
                <Image
                  style={{marginLeft: 10}}
                  source={require('@assets/trash1.png')}
                />
              </TouchableOpacity>
            </View>)}
            
            <Image />
          </View>
        </>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardItemListView;

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 20,
  },
});
