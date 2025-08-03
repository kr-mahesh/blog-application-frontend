import { jwtDecode } from 'jwt-decode';

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem('token');
}
