async function requireAuth(allowedRoles = null) {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = '/index.html'; return null; }

  let user = JSON.parse(sessionStorage.getItem('platanalUser') || 'null');
  if (!user) {
    const { data, error } = await sb.from('users').select('*').eq('id', session.user.id).single();
    if (error || !data) { window.location.href = '/index.html'; return null; }
    user = data;
    sessionStorage.setItem('platanalUser', JSON.stringify(user));
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    window.location.href = '/index.html';
    return null;
  }
  return user;
}

async function login(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const { data: user } = await sb.from('users').select('rol').eq('id', data.user.id).single();
  sessionStorage.setItem('platanalUser', JSON.stringify(user));
  const redirects = {
    gerente: 'maestros/index.html',
    oficinista: 'maestros/index.html',
    operario: 'calidad/index.html',
    chofer: 'despacho/index.html',
    cosechero: 'portal/index.html'
  };
  window.location.href = redirects[user.rol] || 'maestros/index.html';
}

async function logout() {
  sessionStorage.removeItem('platanalUser');
  await sb.auth.signOut();
  window.location.href = '../index.html';
}
