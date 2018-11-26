

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  let user = JSON.parse(localStorage.getItem('user'));
  console.log('logout user',user);
}