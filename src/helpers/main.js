const isAuthenticated = () => {
  const authToken = localStorage.getItem("token");
  const userType = localStorage.getItem("type");
  const user = localStorage.getItem("user");

  const isAuth = !!authToken && !!userType && !!user;

  return { isAuth };
};

export { isAuthenticated };
