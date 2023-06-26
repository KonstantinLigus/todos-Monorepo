/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';

export const Schema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});
