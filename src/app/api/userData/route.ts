import axios from "axios";

export async function GET(req:Request, res: Response){
   console.log(req);
   const ip = req.headers.get('x-forwarded-for') ;
   const method = req.method;
   const protocol = req.headers.get('x-forwarded-proto') 
   const currentTime = Date.now();
   const date = new Date(currentTime);
   const hours = date.getHours().toString().padStart(2, '0'); // Zero-padded hours
   const minutes = date.getMinutes().toString().padStart(2, '0'); // Zero-padded minutes
   const seconds = date.getSeconds().toString().padStart(2, '0'); // Zero-padded seconds
   const formattedTime = `${hours}:${minutes}:${seconds}`;

   const apikey = "920671e52fd64b07b7bed66c8ecb97d7";
   const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apikey}`;
   

   // const userAgent = await axios.get(`https://api.ipgeolocation.io/user-agent?apiKey=${apikey}`)
   
   // const response = await axios.get(apiUrl);


   console.log(formattedTime);
   console.log(ip,  method, protocol);
   // const { country_name, state_prov, city, latitude, longitude } = response.data;


   // console.log(country_name, state_prov, city,latitude, longitude);
   

   return Response.json({ success: true, message: "lund" }, { status: 200 });
}