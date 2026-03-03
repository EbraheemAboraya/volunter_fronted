class AuthService {
    getToken() {
      const token = localStorage.getItem("authToken");
      return token;
    }
  
    setToken(token) {
      localStorage.setItem("authToken", token);
    }
  
    removeToken() {
      localStorage.removeItem("authToken"); 
    }
  }
  
  const AuthServiceInstance = new AuthService();
  
  export default AuthServiceInstance;
  