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
import { ButtonComponent } from '../Button';
import { initialValuesLogInForm } from '../../initialValues';
import { SchemaLogIn } from '../../schema';
import { useLogInUser } from '../../hooks/userHooks';
import { APP_KEYS } from '../../consts';

type IValues = typeof initialValuesLogInForm;

export const LoginForm = () => {
  const { mutate: logIn, isSuccess, isError, error } = useLogInUser();

  const submitHandler = (values: IValues, actions: FormikHelpers<IValues>) => {
    const { email, password } = values;
    actions.resetForm({
      values: initialValuesLogInForm
    });
    logIn({ email, password });
  };

  return (
    <>
      <Formik
        initialValues={initialValuesLogInForm}
        validationSchema={SchemaLogIn}
        onSubmit={submitHandler}
      >
        <FormStyled>
          <LabelStyled htmlFor="email">Email:</LabelStyled>
          <FieldStyled id="email" type="email" name="email" />
          <ErrorMessageStyled name="email" />
          {isError &&
            (error.response.data.message === 'Wrong email' ||
              error.response.data.message === 'Email does not verified') && (
              <ErrorStyled>{error.response.data.message}</ErrorStyled>
            )}
          <LabelStyled htmlFor="password">Password:</LabelStyled>
          <FieldStyled id="password" type="password" name="password" />
          <ErrorMessageStyled name="password" />
          {isError && error.response.data.message === 'Wrong password' && (
            <ErrorStyled>{error.response.data.message}</ErrorStyled>
          )}
          <ButtonComponent title="Log In" type="submit" />
        </FormStyled>
      </Formik>
      {isSuccess && <Navigate to={APP_KEYS.ROUTER_KEYS.TODOS} />}
    </>
  );
};
