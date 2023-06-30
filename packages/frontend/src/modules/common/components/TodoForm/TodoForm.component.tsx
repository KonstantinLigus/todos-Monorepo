/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router';
import { SchemaTodoForm } from '../../schema';
import {
  FormTitle,
  ErrorMessageStyled,
  TextAreaStyled,
  FieldStyled,
  FormStyled,
  LabelStyled
} from '../commonStyles/commonStyles';

import { ButtonComponent } from '../Button';
import { usePostNewTodo } from '../../hooks';
import { APP_KEYS } from '../../consts';
import { initialValuesTodoForm } from '../../initialValues';

type IValues = typeof initialValuesTodoForm;

export const TodoForm: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { mutate } = usePostNewTodo();

  const submitHandler = (values: IValues, actions: FormikHelpers<IValues>) => {
    const { title, description } = values;
    actions.resetForm({
      values: initialValuesTodoForm
    });
    mutate({ title, description });
    navigate(APP_KEYS.ROUTER_KEYS.TODOS);
  };

  return (
    <>
      <FormTitle>Add new TODO</FormTitle>
      <Formik
        initialValues={initialValuesTodoForm}
        validationSchema={SchemaTodoForm}
        onSubmit={submitHandler}
      >
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
