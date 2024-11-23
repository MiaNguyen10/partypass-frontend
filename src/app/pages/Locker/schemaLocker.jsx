import * as yup from "yup";

export const schemaLocker = yup.object().shape({
  locker_number: yup.number().required("Locker number is required"),
  institution: yup.string().required("Institution is required"),
  status: yup.string().required("Locker status is required"),
});
