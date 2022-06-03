import { memo } from "react";

import { useBeforeUnload } from "react-use";

interface IWarningUnsavedForm {
  areChangesUnsaved: boolean;
}

const WarningUnsavedForm = ({ areChangesUnsaved }: IWarningUnsavedForm) => {
  useBeforeUnload(areChangesUnsaved, "You have unsaved changes, are you sure?");

  return null;
};

export default memo(WarningUnsavedForm);
