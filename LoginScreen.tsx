import { useDispatch } from 'react-redux';
import { Button, Text, View, TextInput } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Authentication } from './app/reducers/Authentication';

export function LoginScreen() {
  const { control, handleSubmit, errors } = useForm<any>();
  const dispatch = useDispatch();
  const onSubmit: any = ({ email, password }: any) => {
    dispatch(Authentication.actions.authenticate({ email, password }));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <View>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
