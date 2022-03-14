interface IUserData {
  email: string;
  name: string;
  role: string;
}

const initialUserState = {
  email: "",
  name: "",
  role: "",
};

export { initialUserState };

export type { IUserData };
