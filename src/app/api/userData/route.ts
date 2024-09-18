import axios from "axios";
import DataSet from "@/models/dataset.model"; 
import { connectDb } from "@/database/db.config";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    await connectDb();

    const method = req.method;
    const protocol = req.headers.get('x-forwarded-proto') || "http";
    const currentTime = Math.floor(Date.now() / 1000);
    const port = req.headers.get('x-forwarded-port') || 80;

    const res = await axios.get(`https://ip.ba3a.tech`);
    console.log(res.data)

    let redirectTo = null;

    if (res.data) {
      const suspiciousRequests = await DataSet.countDocuments({ 
        ip: res.data.ip,
        time: { $gte: currentTime - 60*5 }
      });

      if (suspiciousRequests >= 20) {
        redirectTo = '/captcha';
      }

      const similarBehaviorRequests = await DataSet.countDocuments({
        'location.country': res.data.country,
        'location.city': res.data.city,
        'browser': req.headers.get('user-agent'),
        time: { $gte: currentTime - 60 },
      });

      console.log("similarBehaviorRequests: ", similarBehaviorRequests);

      if (similarBehaviorRequests >= 20) {
        redirectTo = '/captcha';
      }

      const surgeInPageRequests = await DataSet.countDocuments({
        method: "GET",
        time: { $gte: currentTime - 60*5 }
      });

      console.log("surgeInPageRequests: ", surgeInPageRequests);

      if (surgeInPageRequests >= 20) {
        redirectTo = '/captcha';
      }

      await DataSet.create({
        ip: res.data.ip,
        location: {
          country: res.data.country,
          city: res.data.city,
        },
        protocol,
        time: currentTime,
        port: Number(port),
        method,
        isp: res.data.isp,
        org: res.data.org,
        browser: req.headers.get('user-agent'),
      });
    }

    if (redirectTo) {
      return NextResponse.json({ success: true, redirectTo }, { status: 200 });
    }

    return NextResponse.json({ success: true, message: "Request allowed" }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Failed to process request" }, { status: 500 });
  }
}