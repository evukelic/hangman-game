import { useState } from "react";

const REQUIRED_ERROR_MESSAGE: string = "This field is required";

export function useInputValidate() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validate = () => {
    if (!value?.trim()) {
      setError(REQUIRED_ERROR_MESSAGE);

      return false;
    }
    setError("");

    return true;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (error) {
      validate();
    }
  };

  return { value, error, onChange, validate };
}
