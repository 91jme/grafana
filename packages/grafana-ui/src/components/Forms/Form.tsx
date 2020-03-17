import React, { useEffect } from 'react';
import { useForm, Mode, OnSubmit, DeepPartial, FormContextValues } from 'react-hook-form';

type FormAPI<T> = Pick<FormContextValues<T>, 'register' | 'errors' | 'control'>;

interface FormProps<T> {
  validateOn?: Mode;
  validateOnMount?: boolean;
  defaultValues?: DeepPartial<T>;
  onSubmit: OnSubmit<T>;
  children: (api: FormAPI<T>) => React.ReactNode;
}

export function Form<T>({ validateOn, defaultValues, onSubmit, validateOnMount = false, children }: FormProps<T>) {
  const { handleSubmit, register, errors, control, triggerValidation } = useForm<T>({
    mode: validateOn,
    defaultValues,
  });

  useEffect(() => {
    if (validateOnMount) {
      triggerValidation();
    }
  }, []);

  return <form onSubmit={handleSubmit(onSubmit)}>{children({ register, errors, control })}</form>;
}
