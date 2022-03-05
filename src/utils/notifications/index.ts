import { toast } from "react-hot-toast";

type TPromiseNotifications = {
  loading: string;
  success: string;
  error: string;
};

const successNotification = (message: string, id?: string) => {
  return toast.success(message, {
    id,
  });
};

const blankNotification = (message: string, id?: string): string => {
  return toast(message, {
    id,
  });
};

const errorNotification = (message: string, id?: string): string => {
  return toast.error(message, {
    id,
  });
};

const loadingNotification = (message: string, id?: string): string => {
  return toast.loading(message, {
    id,
  });
};

const promiseNotification = (promise: Promise<unknown>, config: TPromiseNotifications) => {
  return toast.promise(promise, config);
};

const dismissNotification = (id?: string) => {
  toast.dismiss(id);
};

export {
  blankNotification,
  dismissNotification,
  errorNotification,
  loadingNotification,
  promiseNotification,
  successNotification,
};
