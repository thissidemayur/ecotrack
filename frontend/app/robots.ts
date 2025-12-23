import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
const baseUrl = "https://ecotrack.thissidemayur.me";
return {
    rules:{
        userAgent: "*", // applies to all web crawlers
        allow: "/",    // allow all pages to be crawled
        disallow: ["/dashboard/","/user/"], // disallow crawling of dashboard
    },
    sitemap:`${baseUrl}/sitemap.xml`, // specify the sitemap location
}

}
