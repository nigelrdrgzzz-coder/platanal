// Auth desactivado temporalmente — acceso directo
async function requireAuth() {
  return { nombre: 'Nigel', rol: 'gerente', email: 'nigelrdrgzzz@gmail.com' };
}

async function logout() {
  window.location.href = '../index.html';
}
