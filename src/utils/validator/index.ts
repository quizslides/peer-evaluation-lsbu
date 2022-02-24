import { mixed, string } from "yup";

import { Role } from "@/utils/permissions";
import content from "@/utils/validator/content";

const emailValidator = {
  email: string()
    .default(content.email.defaultValue)
    .email(content.email.invalid)
    .matches(content.email.regex, content.email.invalidDomain)
    .required(content.email.required),
};

const nameValidator = {
  name: string().max(70, content.name.maxLength).required(content.name.required),
};

const roleValidator = {
  role: mixed()
    .oneOf([...Object.keys(Role)], content.role.oneOf)
    .required(content.role.required),
};

export { emailValidator, nameValidator, roleValidator };
