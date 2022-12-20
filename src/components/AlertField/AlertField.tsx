import { FC, memo, useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import { successNotification } from "@/utils";

interface IAlertField {
  initialValue: string | number;
  isVisible: boolean;
  messageOnChange: string;
  messageOnReset: string;
  value: string | number;
}

const AlertField: FC<IAlertField> = ({ initialValue, isVisible, messageOnChange, messageOnReset, value }) => {
  const [isAlertTriggered, setAlertTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      if (value != initialValue && !isAlertTriggered) {
        toast(messageOnChange, {
          icon: "🚨",
        });

        setAlertTriggered(true);
      }

      if (isAlertTriggered && value == initialValue) {
        successNotification(messageOnReset);

        setAlertTriggered(false);
      }
    }
  }, [initialValue, isAlertTriggered, isVisible, messageOnChange, messageOnReset, value]);

  return null;
};

export default memo(AlertField);
