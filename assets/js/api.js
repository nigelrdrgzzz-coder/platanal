// Todas las llamadas pasan por n8n — nunca directamente a Supabase
const N8N = 'https://n8n-n8n.cvqmib.easypanel.host/webhook';

async function apiGet(path) {
  const resp = await fetch(`${N8N}/${path}`);
  if (!resp.ok) throw new Error(`Error ${resp.status}`);
  return resp.json();
}

async function apiPost(path, data) {
  const resp = await fetch(`${N8N}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!resp.ok) throw new Error(`Error ${resp.status}: ${await resp.text()}`);
  return resp.json();
}

// MAESTROS
async function getFincas() { return apiGet('platanal/fincas'); }
async function getCosecheros() { return apiGet('platanal/cosecheros'); }

// ALBARANES
async function crearAlbaran(datos) { return apiPost('platanal/albaran', datos); }
async function enviarAlbaran(id) { return apiPost('platanal/enviar-albaran', { id }); }

// LECTURA DIRECTA (dashboard y listas — solo lectura, usamos Supabase anon)
async function getAlbaranes(filtros = {}) {
  let q = sb.from('albaranes_entrada').select('*, fincas(nombre), cosecheros(nombre)').order('created_at', { ascending: false });
  if (filtros.estado) q = q.eq('estado', filtros.estado);
  if (filtros.limit) q = q.limit(filtros.limit);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

async function getLotes(filtros = {}) {
  let q = sb.from('lotes').select('*, albaranes_entrada(numero, fincas(nombre)), camaras(nombre)');
  if (filtros.estado) q = q.eq('estado', filtros.estado);
  const { data, error } = await q.order('fecha_entrada');
  if (error) throw error;
  return data;
}
