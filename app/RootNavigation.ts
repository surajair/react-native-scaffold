import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
