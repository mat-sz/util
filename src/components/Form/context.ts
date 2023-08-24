import React from 'react';
import { get } from 'radash';

export interface IFormContext {
  values: any;
  onChange: (key: string, value: any) => void;
}

export const FormContext = React.createContext<IFormContext>(undefined as any);

export const useField = (key: string): [any, (value: any) => void] => {
  const form = React.useContext(FormContext);

  return [get(form.values, key), (value: any) => form.onChange(key, value)];
};
