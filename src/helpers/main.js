const isAuthenticated = () => {
  const authToken = localStorage.getItem("token");

  const isAuth = !!authToken;

  return { isAuth };
};

export { isAuthenticated };
