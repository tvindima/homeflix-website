import { NextResponse } from "next/server";

export function okJson(payload: Record<string, unknown>) {
  return NextResponse.json({ ok: true, ...payload });
}

export function errorJson(status: number, message: string, errors: string[] = []) {
  return NextResponse.json(
    {
      ok: false,
      message,
      errors,
    },
    { status },
  );
}
