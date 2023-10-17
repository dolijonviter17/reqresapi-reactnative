/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import {
  CreateUserScreen,
  DetailUserScreen,
  UpdateUserScreen,
  UsersScreen,
} from "../screens";

export type RootStackParams = {
  // QTI
  Edit: undefined;
  Dashboard: undefined;
  Create: undefined;
  CreateUser: undefined;
  Users: undefined;
  Update: { user: any };
  Detail: { user: any };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Users"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Users" component={UsersScreen} />
      <RootStack.Screen name="Update" component={UpdateUserScreen} />
      <RootStack.Screen name="Detail" component={DetailUserScreen} />
      <RootStack.Screen name="CreateUser" component={CreateUserScreen} />

      {/* <RootStack.Screen name="Dashboard" component={DashboardScreen} /> */}
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
