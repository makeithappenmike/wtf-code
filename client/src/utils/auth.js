import decode from 'jwt-decode';

class AuthService {

  // Get token to decode
  getProfile() {
    return decode(this.getToken());
  }

  // Determine whether someone is logged in and set expiration
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // If the token expires, remove it from local storage
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  // Get the token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Log someone in by setting a token to local storage and then redirecting them to /home
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }

  // Log someone out by remove a toke from local storage and then redirecting them to /login
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
