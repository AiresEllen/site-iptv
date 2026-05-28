const JWT_SECRET = process.env.JWT_SECRET || "";

function base64UrlEncode(value: string) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createSignature(payload: string) {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  const bytes = Array.from(new Uint8Array(signature));
  const binary = bytes.map((byte) => String.fromCharCode(byte)).join("");

  return base64UrlEncode(binary);
}

export async function createAdminToken() {
  const payload = base64UrlEncode(
    JSON.stringify({
      role: "admin",
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }),
  );

  const signature = await createSignature(payload);

  return `${payload}.${signature}`;
}

export async function verifyAdminToken(token: string) {
  try {
    if (!JWT_SECRET) return null;

    const [payload, signature] = token.split(".");

    if (!payload || !signature) return null;

    const validSignature = await createSignature(payload);

    if (signature !== validSignature) return null;

    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );

    if (!decoded.exp || Date.now() > decoded.exp) return null;

    if (decoded.role !== "admin") return null;

    return decoded;
  } catch {
    return null;
  }
}
