import { Input, InputProps } from '../Input/index.js';
import { useField } from './context.js';

interface FormInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  name: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, ...props }) => {
  const [value, setValue] = useField(name);
  return <Input {...props} value={value} onChange={setValue} />;
};
