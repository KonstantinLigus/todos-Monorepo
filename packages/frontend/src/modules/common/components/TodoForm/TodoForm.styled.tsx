/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import styled, { css } from 'styled-components';

export const FormTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.SPACES.s};
  font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.light};
  text-align: center;
`;

export const LabelStyled = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.SPACES.s};
  font-size: ${({ theme }) => theme.FONTS.SIZES.m};
`;

export const FormStyled = styled(Form)`
  max-width: 700px;
  margin: auto;
`;

const CommonFieldStyles = css`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.SPACES.s};
  font-size: ${({ theme }) => theme.FONTS.SIZES.m};
  margin-bottom: ${({ theme }) => theme.SPACES.s};
`;

export const FieldStyled = styled(Field)`
  ${CommonFieldStyles}
  height: 50px;
`;

export const TextAreaStyled = styled(Field)`
  ${CommonFieldStyles}
  height: 150px;
`;

export const ErrorStyled = styled.p`
  margin-bottom: ${({ theme }) => theme.SPACES.s};
  font-size: ${({ theme }) => theme.FONTS.SIZES.s};
  color: ${({ theme }) => theme.COLORS.attention};
`;

export const ErrorMessageStyled = ({ name }: { name: string }) => (
  <ErrorMessage name={name} render={(message) => <ErrorStyled>{message}</ErrorStyled>} />
);
