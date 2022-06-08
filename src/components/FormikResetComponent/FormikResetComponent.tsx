import { memo, useEffect, useState } from "react";

import { useFormikContext } from "formik";

interface IFormikResetComponent {
  data: object;
}

const FormikResetComponent = ({ data }: IFormikResetComponent) => {
  const formik = useFormikContext();

  const [initialState, setInitialState] = useState<object | null>(null);

  useEffect(() => {
    if (initialState !== data) {
      formik.resetForm({ values: data });
      setInitialState(data);
    }
  }, [data, formik, initialState]);

  return null;
};

export default memo(FormikResetComponent);
