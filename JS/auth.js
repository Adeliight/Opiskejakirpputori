
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

// Called by signup page
function signupHandler({ username, password, email }) {
  if (!username || !password || !email) return { ok: false, msg: 'Please fill all fields' };
  const users = getUsers();
  users.push({ username, password, email });
  saveUsers(users);
  localStorage.setItem('currentUser', JSON.stringify({ username, email }));
  return { ok: true };
}

// Called by signin page
function signinHandler(username, password) {
  if (!username || !password) return { ok: false, msg: 'Please enter credentials' };
  const user = findUser(username);
  if (!user || user.password !== password) return { ok: false, msg: 'Invalid username or password' };
  localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
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
