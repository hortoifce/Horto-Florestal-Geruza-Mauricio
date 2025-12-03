export default async function sitemap() {
    return [
        {
            url: "https://horto-florestal-geruza-mauricio.vercel.app/",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
}
