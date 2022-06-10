import { memo, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useBeforeUnload } from "react-use";

interface IWarningUnsavedForm {
  areChangesUnsaved: boolean;
}

const WarningUnsavedForm = ({ areChangesUnsaved }: IWarningUnsavedForm) => {
  const router = useRouter();

  const confirmationMessage = "You have unsaved changes on this page, are you sure you want to leave this page?";

  useBeforeUnload(areChangesUnsaved, confirmationMessage);

  const [dirtyForm, setDirtyForm] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (dirtyForm && !window.confirm(confirmationMessage)) {
        throw "Error routing when user clicks on cancel";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, dirtyForm]);

  useEffect(() => {
    setDirtyForm(areChangesUnsaved);
  }, [areChangesUnsaved]);

  return null;
};

export default memo(WarningUnsavedForm);
