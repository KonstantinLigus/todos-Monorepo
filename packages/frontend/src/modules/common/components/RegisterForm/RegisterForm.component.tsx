import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Navigate } from 'react-router';
import {
  ErrorMessageStyled,
  ErrorStyled,
  FieldStyled,
  FormStyled,
  LabelStyled
} from '../commonStyles/commonStyles';
import { initialValuesRegisterForm } from '../../initialValues';
import { ButtonComponent } from '../Button';
import { useRegisterNewUser } from '../../hooks/userHooks';
import * as theme from '../../../theme';
import { APP_KEYS } from '../../consts';
import { SchemaRegister } from '../../schema';

type IValues = typeof initialValuesRegisterForm;

export const RegisterForm = () => {
  const { mutate: register, isSuccess, isError, error } = useRegisterNewUser();

  const onSubmitClick = (values: IValues, actions: FormikHelpers<IValues>) => {
    const { email, name, password } = values;
    actions.resetForm({
      values: initialValuesRegisterForm
    });
    register({ name, email, password });
  };

  return (
    <>
      <Formik
        initialValues={initialValuesRegisterForm}
        validationSchema={SchemaRegister}
        onSubmit={onSubmitClick}
      >
        <FormStyled>
          <LabelStyled htmlFor="name">Username:</LabelStyled>
          <FieldStyled id="name" type="text" name="name" />
          <ErrorMessageStyled name="name" />
          {isError && error.response.data.message === 'name in use' && (
            <ErrorStyled>{error.response.data.message}</ErrorStyled>
          )}
          <LabelStyled htmlFor="email">Email:</LabelStyled>
          <FieldStyled id="email" type="email" name="email" />
          <ErrorMessageStyled name="email" />
          {isError && error.response.data.message === 'email in use' && (
            <ErrorStyled>{error.response.data.message}</ErrorStyled>
          )}
          <LabelStyled htmlFor="password">Password:</LabelStyled>
          <FieldStyled id="password" type="password" name="password" />
          <ErrorMessageStyled name="password" />
          <ButtonComponent title="Register" type="submit" mt={theme.SPACES.s} />
        </FormStyled>
      </Formik>
      {isSuccess && <Navigate to={APP_KEYS.ROUTER_KEYS.TODOS} />}
    </>
  );
};
