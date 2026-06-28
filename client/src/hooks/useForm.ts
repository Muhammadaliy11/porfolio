import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;
type Errors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends AnyRecord>(
  initialValues: T,
  validate: (values: T) => Errors<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const updated = { ...values, [name]: value } as T;
      setValues(updated);
      if (touched[name as keyof T]) {
        const newErrors = validate(updated);
        setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof T] }));
      }
    },
    [values, touched, validate]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const newErrors = validate(values);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof T] }));
    },
    [values, validate]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors = validate(values);
    setErrors(newErrors);
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<keyof T, boolean>
    );
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, handleChange, handleBlur, validateAll, reset };
}
