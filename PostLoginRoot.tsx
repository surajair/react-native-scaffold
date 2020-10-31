import { Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const SettingsScreen = () => {
  return (
    <View>
      <Text>More Screen</Text>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const ReportsScreen = () => {
  return (
    <View>
      <Text>Reports Screen</Text>
    </View>
  );
};

export function PostLoginRoot() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
