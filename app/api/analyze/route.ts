export async function POST() {
  return new Response(
    JSON.stringify({ error: "next_api_disabled_use_fastapi_direct" }),
    { status: 410, headers: { "Content-Type": "application/json" } }
  );
}

export async function GET() {
  return new Response(
    JSON.stringify({ error: "next_api_disabled_use_fastapi_direct" }),
    { status: 410, headers: { "Content-Type": "application/json" } }
  );
}

