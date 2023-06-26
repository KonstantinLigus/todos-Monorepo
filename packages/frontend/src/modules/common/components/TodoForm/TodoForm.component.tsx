/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';
import { Schema } from '../../schema';
import {
  ErrorMessageStyled,
  FieldStyled,
  FormStyled,
  FormTitle,
  LabelStyled,
  TextAreaStyled
} from './TodoForm.styled';
import { ButtonComponent } from '../Button';
import { usePostNewTodo } from '../../hooks';
import { APP_KEYS } from '../../consts';

const initialValues = {
  title: '',
  description: ''
};

type IValues = typeof initialValues;

export const TodoForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { mutate } = usePostNewTodo();

  const submitHandler = (values: IValues, actions: FormikHelpers<IValues>) => {
    const { title, description } = values;
    actions.resetForm({
      values: initialValues
    });
    mutate({ title, description });
    navigate(APP_KEYS.ROUTER_KEYS.TODOS);
  };

  return (
    <>
      <FormTitle>Add new TODO</FormTitle>
      <Formik initialValues={initialValues} validationSchema={Schema} onSubmit={submitHandler}>
        <FormStyled>
          <LabelStyled htmlFor="title">Title</LabelStyled>
          <FieldStyled id="title" name="title" />
          <ErrorMessageStyled name="title" />
          <LabelStyled htmlFor="description">Description</LabelStyled>
          <TextAreaStyled id="description" name="description" component="textarea" />
          <ErrorMessageStyled name="description" />
          <ButtonComponent type="submit" title="Add todo" />
        </FormStyled>
      </Formik>
    </>
  );
};
