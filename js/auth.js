const USER_KEY = "user";
const TOKEN_KEY = "token";

export function saveAuth(data) {
 const isNoroffStudent = data.email.endsWith("@stud.noroff.no");

 const user = {
  name: data.name,
  email: data.email,
  venueManager: isNoroffStudent,
 };
 localStorage.setItem(USER_KEY, JSON.stringify(user));
 localStorage.setItem(TOKEN_KEY, data.accessToken);
}

// GET USER
export function getUser() {
 return JSON.parse(localStorage.getItem(USER_KEY));
}

// ARE THE USER VENUE MANAGER/ADMIN
export function isAdmin() {
 const user = getUser();
 return user?.venueManager === true;
}

//LOGGED IN
export function isLoggedIn() {
 return !!localStorage.getItem(TOKEN_KEY);
}

//LOG OUT ADMIN
export function logout() {
 localStorage.removeItem(USER_KEY);
 localStorage.removeItem(TOKEN_KEY);
}
