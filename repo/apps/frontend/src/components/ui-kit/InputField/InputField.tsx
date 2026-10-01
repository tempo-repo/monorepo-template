import clsx from 'clsx';
import type { FC } from 'react';

import { Field } from '@ui/kit';

import type { InputFieldProps } from './InputField.props';

export const InputField: FC<InputFieldProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Field
      as={'input'}
      className={clsx(className)}
      {...props}
    >
      {children}
    </Field>
  );
};
