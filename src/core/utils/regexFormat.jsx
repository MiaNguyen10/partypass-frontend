export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i;

export const videoLinkRegExp =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

const regexFormat = {
  passwordRegExp,
  videoLinkRegExp,
};

export default regexFormat;
