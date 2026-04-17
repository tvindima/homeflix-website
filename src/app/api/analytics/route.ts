import { appendRecord } from "@/lib/server/fs-db";
import { allowRequest } from "@/lib/server/rate-limit";
import { getClientIp, getUserAgent } from "@/lib/server/request";

export async function POST(request: Request) {
  const ip = await getClientIp();
  const userAgent = await getUserAgent();

  if (!allowRequest(`analytics:${ip}`, 80, 60_000)) {
    return new Response(null, { status: 204 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return new Response(null, { status: 204 });
  }

  await appendRecord("analytics_events", {
    ...payload,
    ip,
    userAgent,
    createdAt: new Date().toISOString(),
  });

  return new Response(null, { status: 204 });
}
