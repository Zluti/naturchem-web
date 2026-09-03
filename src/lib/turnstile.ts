const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstilePayload = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type VerifyTurnstileOptions = {
  token: string;
  secret: string;
  remoteIp?: string;
  expectedAction: string;
  expectedHostname: string;
};

export type TurnstileVerification = {
  success: boolean;
  errorCodes: string[];
};

export async function verifyTurnstileToken({
  token,
  secret,
  remoteIp,
  expectedAction,
  expectedHostname
}: VerifyTurnstileOptions): Promise<TurnstileVerification> {
  if (!token || token.length > 2048 || !secret) {
    return { success: false, errorCodes: ["missing-input"] };
  }

  const body = new URLSearchParams({
    secret,
    response: token
  });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return { success: false, errorCodes: [`http-${response.status}`] };
    }

    const payload = (await response.json()) as TurnstilePayload;
    const actionMatches = payload.action === expectedAction;
    const hostnameMatches = payload.hostname?.toLowerCase() === expectedHostname.toLowerCase();
    const validationErrors = [
      ...(!actionMatches ? ["action-mismatch"] : []),
      ...(!hostnameMatches ? ["hostname-mismatch"] : [])
    ];
    return {
      success: payload.success === true && validationErrors.length === 0,
      errorCodes:
        payload.success === true
          ? validationErrors
          : payload["error-codes"] ?? []
    };
  } catch {
    return { success: false, errorCodes: ["verification-unavailable"] };
  }
}
