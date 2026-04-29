function renderNav(activeItem) {
  const user = JSON.parse(sessionStorage.getItem('platanalUser') || '{}');
  const isStaff = ['gerente', 'oficinista'].includes(user.rol);
  const isOperario = user.rol === 'operario';

  const items = [
    { href: '../maestros/index.html', label: 'Maestros', key: 'maestros', show: isStaff },
    { href: '../recepcion/index.html', label: 'Recepción', key: 'recepcion', show: isStaff },
    { href: '../calidad/index.html', label: 'Calidad', key: 'calidad', show: isStaff || isOperario },
  ].filter(i => i.show);

  document.getElementById('nav').innerHTML = `
    <nav>
      <a href="../maestros/index.html" class="logo">🍌 Platanal</a>
      ${items.map(i => `<a href="${i.href}" class="${activeItem === i.key ? 'active' : ''}">${i.label}</a>`).join('')}
      <a href="#" onclick="logout()" style="margin-left:auto;font-size:13px">Salir (${user.nombre || ''})</a>
    </nav>
  `;
}
