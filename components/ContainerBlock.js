import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import userData from "@constants/data";
import { SITE_URL as siteUrl } from "@constants/site";

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();

  const meta = {
    title: "Adam Peleback - Frontend Developer and Esports Organizer",
    description: `Frontend Developer, Esports Tournament Organizer, and Writer. I've been building web applications for over 5 years and I'm passionate about building products that bring value to people around the globe.`,
    image: "/og-image.png",
    imageAlt: "Adam Peleback — Frontend Developer, QA Engineer, Esports Organizer",
    type: "website",
    robots: "follow, index",
    ...customMeta,
  };
  // The default card is rendered at the recommended 1200x630; pages that pass
  // their own image (project screenshots) have unknown dimensions, so only
  // emit width/height for the default.
  const isDefaultOgImage = meta.image === "/og-image.png";
  // On the server, asPath for "/" resolves to "/index", which would point the
  // canonical at a duplicate URL. Normalise it back, and drop trailing slashes
  // so "/about" and "/about/" never disagree.
  const canonicalPath =
    router.asPath
      .split("?")[0]
      .split("#")[0]
      .replace(/\/index$/, "")
      .replace(/\/$/, "") || "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const ogImageUrl = meta.image.startsWith("http")
    ? meta.image
    : `${siteUrl}${meta.image}`;
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: userData.name,
    url: siteUrl,
    // Always the portrait — the og image is a branded share card, not a photo.
    image: `${siteUrl}/adam.png`,
    jobTitle: userData.designation,
    email: userData.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stockholm",
      addressCountry: "Sweden",
    },
    sameAs: [
      userData.socialLinks.github,
      userData.socialLinks.linkedin,
      userData.socialLinks.instagram,
    ],
  };
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: canonicalUrl,
  };
  const customStructuredData = meta.structuredData
    ? Array.isArray(meta.structuredData)
      ? meta.structuredData
      : [meta.structuredData]
    : [];
  const structuredDataItems = [
    personStructuredData,
    pageStructuredData,
    ...customStructuredData,
  ];

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content={meta.robots} />
        <meta name="author" content={userData.name} />
        <meta content={meta.description} name="description" />
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        <meta
          property="og:url"
          content={canonicalUrl}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Adam Peleback" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={meta.imageAlt || meta.title} />
        {isDefaultOgImage && (
          <>
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ThatGuy_HS" />
        <meta name="twitter:creator" content="@ThatGuy_HS" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={meta.imageAlt || meta.title} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
        {structuredDataItems.map((item, index) => (
          <script
            key={`${item["@type"] || "schema"}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
