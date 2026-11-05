// Publiceren naar LinkedIn via de Images- en Posts-API (REST).
// Vereist: een toegangstoken met w_organization_social (bedrijfspagina; vraagt goedkeuring van LinkedIn voor de
// Community Management API) of w_member_social (persoonlijk profiel), en LINKEDIN_AUTHOR_URN,
// bv. urn:li:organization:123456 of urn:li:person:abc123.
const API = process.env.LINKEDIN_API_URL || 'https://api.linkedin.com/rest'; // LINKEDIN_API_URL alleen voor tests met een nagebootste server
const koppen = () => ({
  Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
  'Linkedin-Version': process.env.LINKEDIN_VERSION || '202510',
  'X-Restli-Protocol-Version': '2.0.0',
  'Content-Type': 'application/json',
});

// In LinkedIn-commentaar hebben deze tekens een speciale betekenis; ze worden "ge-escaped" zodat de tekst letterlijk blijft.
const esc = (t) => t.replace(/[\\|{}@[\]()<>#*_~]/g, (c) => `\\${c}`);

export async function publiceerLinkedIn({ imageBytes, tekst, hashtags = [], alt }) {
  const auteur = process.env.LINKEDIN_AUTHOR_URN;
  if (!auteur || !process.env.LINKEDIN_ACCESS_TOKEN) throw new Error('LINKEDIN_AUTHOR_URN en LINKEDIN_ACCESS_TOKEN zijn niet ingesteld');
  // 1. upload initialiseren
  const init = await fetch(`${API}/images?action=initializeUpload`, { method: 'POST', headers: koppen(), body: JSON.stringify({ initializeUploadRequest: { owner: auteur } }) });
  const initJson = await init.json().catch(() => ({}));
  if (!init.ok) throw new Error(`LinkedIn upload-initialisatie ${init.status}: ${initJson.message ?? 'onbekende fout'}`);
  const { uploadUrl, image } = initJson.value;
  // 2. afbeelding uploaden
  const up = await fetch(uploadUrl, { method: 'PUT', headers: { Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}` }, body: imageBytes });
  if (!up.ok) throw new Error(`LinkedIn upload ${up.status}`);
  // 3. post plaatsen
  const commentary = [esc(tekst), hashtags.join(' ')].filter(Boolean).join('\n\n');
  const res = await fetch(`${API}/posts`, {
    method: 'POST', headers: koppen(),
    body: JSON.stringify({
      author: auteur, commentary, visibility: 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
      content: { media: { id: image, altText: alt } },
      lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false,
    }),
  });
  if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(`LinkedIn post ${res.status}: ${j.message ?? 'onbekende fout'}`); }
  return res.headers.get('x-restli-id');
}

export const voorbeeldLinkedIn = ({ tekst, hashtags, alt }) => ({ endpoint: `POST ${API}/posts`, auteur: '${LINKEDIN_AUTHOR_URN}', alt, tekst: [tekst, (hashtags ?? []).join(' ')].filter(Boolean).join('\n\n') });
