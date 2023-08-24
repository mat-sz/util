import React from 'react';
import { FormContext } from './context.js';

interface FormProps
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onChange' | 'method'
  > {
  values: any;
  onChange: (key: string, value: any) => void;
}

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  children,
  values,
  onChange,
  ...props
}) => {
  return (
    <form
      {...props}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <FormContext.Provider value={{ values, onChange }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};
