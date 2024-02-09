// function for password hidden input store in formik value. When password input is
// hidden value contains *** and last character
export const pushToPassword = (
  newPass,
  formikPass,
  formikSetPass,
  isPasswordHidden
) => {
  if (newPass === '') {
    formikSetPass('');
    return;
  }
  if (!isPasswordHidden) {
    formikSetPass(newPass);
    return;
  } else {
    if (newPass.length > formikPass.length) {
      const newChar = newPass.substring(formikPass.length);
      formikSetPass(formikPass.concat(newChar));
      return;
    } else if (newPass.length < formikPass.length) {
      formikSetPass('');
      return;
    }
  }
};
