export default (user, currentUsers) => {
  let error = "";

  if (currentUsers.length >= 1) {
    const emailExists = currentUsers.some(
      (exUser) => exUser.email === user.email
    );
    const usernameExists = currentUsers.some(
      (exUser) => exUser.username === user.username
    );
    if (emailExists || usernameExists) {
      error = "user with same username or email already exist";
    }
  }
  return error;
};
