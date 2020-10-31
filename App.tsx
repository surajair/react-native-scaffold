import React, { useCallback } from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { isUndefined } from 'lodash';
import store from './app/Store';
import { ScreenChangeAction } from './app/Actions';
import { navigationRef } from './app/RootNavigation';
import { PostLoginRoot } from './PostLoginRoot';
import { LoginScreen } from './LoginScreen';
import { useSelector } from 'react-redux';
import { isUserLoggedIn } from './app/selectors/Selector';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function getHeaderTitle(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'TruckX';
  return routeName;
}

const App = () => {
  const dispatchStateChangeAction = useCallback(() => {
    const { name, params } = navigationRef.current.getCurrentRoute();
    store.dispatch(
      ScreenChangeAction({
        screen: name,
        props: isUndefined(params) ? {} : params,
      }),
    );
  }, []);

  const isLoggedIn: boolean = useSelector(isUserLoggedIn);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={dispatchStateChangeAction}
        onStateChange={dispatchStateChangeAction}>
        <Stack.Navigator initialRouteName={'Login'}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                options={({ route }) => ({
                  headerTitle: getHeaderTitle(route),
                })}
                name="PostLoginRoot"
                component={PostLoginRoot}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
