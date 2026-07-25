import { headers } from "next/headers";
import React, { Suspense } from "react";
import LatestMessageClient from "./LatestMessageClient";

async function getLatestMessages() {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4040";
    const res = await fetch(`${apiBaseUrl}/home`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch homepage data: ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    return json?._doc?.latestMessages || [];
  } catch (error) {
    console.error("Error fetching latest messages in server component:", error);
    return [];
  }
}

function getShareDescription(description) {
  if (!description) return "";
  const cleanDescription = description.replace(/\s+/g, " ").trim();
  if (cleanDescription.length <= 200) {
    return cleanDescription;
  }
  return cleanDescription.substring(0, 197) + "...";
}

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  
  const latestMessages = await getLatestMessages();
  const message = latestMessages.find(m => m.id?.toString() === id) || latestMessages[0];
  
  if (!message) {
    return {
      title: "Latest Message - Real Temple",
      description: "Read the latest messages from Real Temple.",
    };
  }

  const title = message.heading || "Latest Message";
  const rawDescription = message.description || "";
  const description = getShareDescription(rawDescription);
  
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4040").replace(/\/$/, "");
  
  const headersList = await headers();
  const host = headersList.get("host") || "www.realtemple.com";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const siteOrigin = `${protocol}://${host}`;
  
  let imageUrl = "";
  if (message.thumbnailImage) {
    if (message.thumbnailImage.startsWith("http")) {
      imageUrl = message.thumbnailImage;
    } else {
      // Use direct backend URL for og:image so share crawlers (WhatsApp, Chrome, etc.)
      // can fetch it directly without going through the Next.js rewrite
      const cleanPath = message.thumbnailImage.replace(/^\//, "");
      imageUrl = `${apiBaseUrl}/${cleanPath}`;
    }
  } else {
    imageUrl = `${siteOrigin}/images/jesus-footer-image.png`;
  }

  const shareUrl = `${siteOrigin}/latest-message?id=${message.id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: shareUrl,
      siteName: "Real Temple",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function LatestMessagePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const latestMessages = await getLatestMessages();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      }
    >
      <LatestMessageClient latestMessages={latestMessages} />
    </Suspense>
  );
}
