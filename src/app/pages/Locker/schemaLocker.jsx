import * as yup from "yup";

export const schemaLocker = yup.object().shape({
  locker_number: yup.number().required("Locker number is required"),
  status: yup.number().required("Locker status is required"),
});
