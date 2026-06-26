import "server-only";

/**
 * Šalje obaveštenje administratoru preko Resend API-ja.
 * Ako RESEND_API_KEY nije podešen — tiho preskače (sajt radi i bez mejlova).
 */
export async function posaljiAdminEmail(
  subject: string,
  html: string,
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const from = process.env.EMAIL_FROM || "Rakija <onboarding@resend.dev>";
  const to =
    process.env.EMAIL_TO ||
    (process.env.ADMIN_EMAILS || "").split(",")[0]?.trim() ||
    "";
  if (!to) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
  } catch {
    // ne prekidaj korisnički tok ako mejl ne prođe
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
