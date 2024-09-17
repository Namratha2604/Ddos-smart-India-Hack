import axios from "axios";
import DataSet from "@/models/dataset.model"; 
import { connectDb } from "@/database/db.config";

connectDb();



export async function GET(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || "Unknown IP"; // Use default if IP is missing
    const method = req.method;
    const protocol = req.headers.get('x-forwarded-proto') || "http"; // Default protocol to http
    const currentTime = Math.floor(Date.now() / 1000); // Time in seconds (UNIX timestamp)
    const port = req.headers.get('x-forwarded-port') || 80; // Default port

    const apiKey = "920671e52fd64b07b7bed66c8ecb97d7"
    const res = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`)
    console.log(res);

    if(res.status === 200){
        const country = res.data.country || "Unknown Country"; // Provide a default value
        const city = res.data.city || "Unknown City"; // Provide a default value
        const lat = res.data.latitude || 0; // Provide a default value
        const long = res.data.longitude || 0; // Provide a default value
        await DataSet.create({
          ip,
          location: {
            country,
            city,
            lat,
            long
          },
          protocol,
          time: currentTime,
          port: Number(port), // Ensure port is an integer
          method
        });
    }
    
    // Make an API call to get geolocation data 920671e52fd64b07b7bed66c8ecb97d7
   //  const response = await axios.get(apiUrl);192.168.143.184
   //  const location = response.data;

   //  const { country_name, state_prov, city } = location;

    // // Create and save the dataset object in MongoDB
    // if(getIpInfo.data.status === "success"){
    //    const country_name = getIpInfo.data.country;
    //   const city = getIpInfo.data.city;
    //   const lat = getIpInfo.data.lat;
    //   const long = getIpInfo.data.long;
    //   await DataSet.create({
    //      ip,
    //      location: {
    //       country: country_name,
    //       city: city,
    //       lat,
    //       long
    //      },
    //      protocol,
    //      time: currentTime,
    //      port: Number(port), // Ensure port is an integer
    //      method
    //   });
    // }
   


    // Return success response
    return Response.json({ success: true, message: "Data saved successfully" }, { status: 200 });
    
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, message: "Failed to save data" }, { status: 500 });
  }
}
