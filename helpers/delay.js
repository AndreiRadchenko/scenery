export const delay = (fun, timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout))
    .then(fun)
    .catch((e) => console.log(e.message));
