// Renderiza el sidebar en cualquier página
function renderSidebar(activeKey) {
  const user = JSON.parse(sessionStorage.getItem('platanalUser') || '{"nombre":"Usuario","rol":"gerente"}');
  const inicial = user.nombre ? user.nombre[0].toUpperCase() : 'U';

  const nav = [
    { key:'dashboard', icon:'🏠', label:'Dashboard', href:'../dashboard/index.html' },
    { section: 'Operaciones' },
    { key:'recepcion', icon:'📥', label:'Recepción', href:'../recepcion/index.html' },
    { key:'calidad', icon:'✅', label:'Calidad', href:'../calidad/index.html' },
    { key:'stock', icon:'📦', label:'Stock', href:'../stock/index.html' },
    { key:'despacho', icon:'🚛', label:'Despacho', href:'../despacho/index.html' },
    { section: 'Finanzas' },
    { key:'valorizacion', icon:'💶', label:'Valorización', href:'../valorizacion/index.html' },
    { section: 'Admin' },
    { key:'maestros', icon:'⚙️', label:'Maestros', href:'../maestros/index.html' },
  ];

  const navHtml = nav.map(item => {
    if (item.section) return `<div class="nav-section">${item.section}</div>`;
    return `<a href="${item.href}" class="nav-item ${item.key === activeKey ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a>`;
  }).join('');

  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-logo">
      <div class="emoji">🍌</div>
      <h1>Platanal</h1>
      <p>Gestión de almacén</p>
    </div>
    <div class="sidebar-user">
      <div class="s-avatar">${inicial}</div>
      <div>
        <span class="s-name">${user.nombre || 'Usuario'}</span>
        <span class="s-rol">${user.rol || ''}</span>
      </div>
    </div>
    <nav class="sidebar-nav">${navHtml}</nav>
    <div class="sidebar-bottom">
      <a href="#" onclick="logout()">↩ Cerrar sesión</a>
    </div>
  `;
}

function getToday() {
  return new Date().toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}
