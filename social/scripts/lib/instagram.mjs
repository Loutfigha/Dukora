// Publiceren naar Instagram via de Content Publishing API van Meta (Graph API).
// Vereist: een Instagram-zakelijk- of creator-account gekoppeld aan een Facebook-pagina, en een
// toegangstoken met de rechten instagram_basic en instagram_content_publish.
// De afbeelding moet via een openbare https-link bereikbaar zijn.
const GRAPH = process.env.META_GRAPH_URL || 'https://graph.facebook.com/v21.0'; // META_GRAPH_URL alleen voor tests met een nagebootste server

async function graph(pad, { methode = 'POST', params = {} } = {}) {
  const url = new URL(`${GRAPH}/${pad}`);
  const body = new URLSearchParams({ ...params, access_token: process.env.META_ACCESS_TOKEN });
  const res = await fetch(methode === 'GET' ? `${url}?${body}` : url, { method: methode, body: methode === 'GET' ? undefined : body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(`Instagram API ${res.status}: ${json.error?.message ?? 'onbekende fout'}`);
  return json;
}

async function wachtTotKlaar(containerId) {
  for (let i = 0; i < 20; i++) {
    const { status_code } = await graph(containerId, { methode: 'GET', params: { fields: 'status_code' } });
    if (status_code === 'FINISHED') return;
    if (status_code === 'ERROR' || status_code === 'EXPIRED') throw new Error(`Instagram-container ${status_code}`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error('Instagram-container werd niet op tijd klaar');
}

/** type: "feed" (afbeelding) of "story". Geeft het id van de gepubliceerde media terug. */
export async function publiceerInstagram({ imageUrl, caption, alt, type = 'feed' }) {
  const id = process.env.IG_USER_ID;
  if (!id || !process.env.META_ACCESS_TOKEN) throw new Error('IG_USER_ID en META_ACCESS_TOKEN zijn niet ingesteld');
  const params = { image_url: imageUrl };
  if (type === 'story') params.media_type = 'STORIES';
  else { params.caption = caption; if (alt) params.alt_text = alt; }
  const container = await graph(`${id}/media`, { params });
  await wachtTotKlaar(container.id);
  const gepubliceerd = await graph(`${id}/media_publish`, { params: { creation_id: container.id } });
  return gepubliceerd.id;
}

export const voorbeeldInstagram = ({ imageUrl, caption, alt, type }) => ({ endpoint: `POST ${GRAPH}/{IG_USER_ID}/media`, image_url: imageUrl, type, alt_text: type === 'story' ? undefined : alt, caption: type === 'story' ? undefined : caption });
