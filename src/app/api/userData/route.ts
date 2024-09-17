import axios from "axios";
import DataSet from "@/models/dataset.model"; 
import { connectDb } from "@/database/db.config";

connectDb();
export async function GET(req: Request) {
  try {
    const method = req.method;
    const protocol = req.headers.get('x-forwarded-proto') || "http"; // Default protocol to http
    const currentTime = Math.floor(Date.now() / 1000); // Time in seconds (UNIX timestamp)
    const port = req.headers.get('x-forwarded-port') || 80; // Default port
    const res = await axios.get(`https://ip.ba3a.tech`)
    console.log(res.data);


    if(res.data){
      await DataSet.create({
         ip: res.data.ip,
         location: {
          country: res.data.country,
          city: res.data.city,
         },
         protocol,
         time: currentTime,
         port: Number(port), // Ensure port is an integer
         method,
         isp: res.data.isp,
         org: res.data.org,
      });
    }
    return Response.json({ success: true, message: "Data saved successfully" }, { status: 200 });
    
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, message: "Failed to save data" }, { status: 500 });
  }
}
