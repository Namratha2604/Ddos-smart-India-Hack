export async function GET() {

  const chars = "02678CDEHKPTVX";
  const randomChars =  Array.from({ length: 6 }, ()=>chars.charAt(Math.floor(Math.random() * chars.length)));;

   return Response.json({ success: true, message: randomChars }, { status: 200 });
}