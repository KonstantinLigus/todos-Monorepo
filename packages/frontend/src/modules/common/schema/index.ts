/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';

export const SchemaTodoForm = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});

export const SchemaRegister = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
});

export const SchemaLogIn = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
});
