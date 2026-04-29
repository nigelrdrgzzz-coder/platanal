function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-ES');
}

function formatKg(num) {
  if (!num && num !== 0) return '—';
  return `${Number(num).toLocaleString('es-ES')} kg`;
}

function formatEur(num) {
  if (!num && num !== 0) return '—';
  return `${Number(num).toFixed(2).replace('.', ',')} €`;
}

function showAlert(msg, type = 'success') {
  const el = document.getElementById('alert');
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}

function showLoading(show) {
  const el = document.getElementById('loading');
  if (el) el.style.display = show ? 'flex' : 'none';
}

function badgeEstado(estado) {
  const map = {
    confirmado: 'badge-confirmado',
    inspeccionado: 'badge-inspeccionado',
    liquidado: 'badge-liquidado',
    pendiente: 'badge-pendiente',
    aprobada: 'badge-aprobada',
    en_stock: 'badge-inspeccionado',
    despachado: 'badge-liquidado'
  };
  return `<span class="badge ${map[estado] || ''}">${estado}</span>`;
}
