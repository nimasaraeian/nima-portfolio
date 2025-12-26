export async function GET() {
  return new Response(JSON.stringify({ status:"ok", root:"app" }), {
    status: 200,
    headers: { "content-type":"application/json" },
  });
}
