import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, ListForm, CreateForm, EditForm,FormDetails } from "@src/sceens";
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListForm"
          component={ListForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateForm"
          component={CreateForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditForm"
          component={EditForm}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="FormDetails"
          component={FormDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
export default App;
