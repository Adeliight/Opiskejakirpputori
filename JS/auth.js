// Toiminto hakee käyttäjälle uniikin ID
function getNextUserId() {
    const lastId = parseInt(localStorage.getItem('lastUserId') || '0', 10);
    const nextId = lastId + 1;

    // Tallennetaan ID localstorageen
    localStorage.setItem('lastUserId', nextId.toString());
    return nextId;
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem('users') || '[]'); }
  catch (e) { return []; }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function findUser(username) {
  if (!username) return null;
  const users = getUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

function isValidGmail(email) {
  if (!email) return false;
  const lower = email.toLowerCase();
  const gmailDomain = '@gmail.com';
  if (!lower.endsWith(gmailDomain)) return false;
  const localPart = lower.slice(0, -gmailDomain.length);
  if (localPart.length < 4) return false;
  if (!/^[a-z0-9._%+-]+$/.test(localPart)) return false;
  const letterCount = (localPart.match(/[a-z]/g) || []).length;
  return letterCount >= 4;
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 4;
}

// Called by signup page
//It checks to ensure that everything is valid
function signupHandler({ username, password, email }) {
  if (!username || !password || !email) return { ok: false, msg: 'Please fill all fields' };
  if (!isValidPassword(password)) return { ok: false, msg: 'Password must be at least 4 characters long' };
  if (!isValidGmail(email)) return { ok: false, msg: 'Email must be a valid @gmail.com address with at least 4 or more of letters' };
  const users = getUsers();
  const userId = getNextUserId();
  users.push({ id: userId, username, password, email }); // Lisätty userid jotta käyttäjä voi poistaa ilmoituksensa
  saveUsers(users);
  localStorage.setItem('currentUser', JSON.stringify({ id: userId, username, email }));
  return { ok: true };
}

// Called by signin page
function signinHandler(username, password) {
  if (!username || !password) return { ok: false, msg: 'Please enter credentials' };
  const user = findUser(username);
  if (!user || user.password !== password) return { ok: false, msg: 'Invalid username or password' };
  localStorage.setItem('currentUser', JSON.stringify({ id: user.id, username: user.username, email: user.email }));
  return { ok: true };
}


//Check whenever users sing up is valid
function onSignupClick() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value.trim();
  const res = signupHandler({ username, password, email });
  const msg = document.getElementById('signupMessage');
  if (!res.ok) {
    msg.textContent = res.msg;
    msg.className = 'message error';
    return;
  }
  msg.textContent = 'Account created. Signing in...';
  msg.className = 'message success';
  setTimeout(() => { window.location.href = 'index.html'; }, 700);
}
//Let them sign in directly if they already have created an account through the Sign Up
function onSigninClick() {
  const username = document.getElementById('signinUsername').value.trim();
  const password = document.getElementById('signinPassword').value;
  const res = signinHandler(username, password);
  const msg = document.getElementById('signinMessage');
  if (!res.ok) {
    msg.textContent = res.msg;
    msg.className = 'message error';
    return;
  }
  msg.textContent = 'Signed in. Redirecting...';
  msg.className = 'message success';
  setTimeout(() => { window.location.href = 'index.html'; }, 500);
}

function logoutHandler() {
  localStorage.removeItem('currentUser');
  updateIndexAuthUI();
}

//Mainly just for the Welcoming the user and showing logout button when usrs are signed in
function updateIndexAuthUI() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const welcomeUser = document.getElementById('welcomeUser');

  if (currentUser) {
    document.body.classList.add('signed-in');
    if (welcomeUser) {
      welcomeUser.textContent = `Welcome, ${currentUser.username}`;
    }
  } else {
    document.body.classList.remove('signed-in');
    if (welcomeUser) {
      welcomeUser.textContent = '';
    }
  }
}

// Buttons for singin, singup and logout
document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) signupBtn.addEventListener('click', onSignupClick);

  const signinBtn = document.getElementById('signinBtn');
  if (signinBtn) signinBtn.addEventListener('click', onSigninClick);

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logoutHandler);

  updateIndexAuthUI();
});