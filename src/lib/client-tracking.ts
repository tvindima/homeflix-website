export type TrackPayload = {
  event: string;
  pathname?: string;
  source?: string;
  meta?: Record<string, string | number | boolean | null>;
};

export function trackEvent(payload: TrackPayload): void {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    navigator.sendBeacon("/api/analytics", body);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}
