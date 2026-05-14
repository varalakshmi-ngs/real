import MainBtn from "@/utils/MainBtn";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API, APIURL } from "@/Core/rl";
import ImageLoader from "@/utils/ImageLoader";

export default function Home_ChurchGallery({ limit = 5 }) {
  const route = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await API.get("/gallery/");
        if (response?.data?.images) {
          setImages(response.data.images.slice(0, limit));
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [limit]);

  if (loading || images.length === 0) return null;

  return (
    <section className="px-6 sm:px-12 py-16 w-full max-w-7xl mx-auto overflow-hidden">
      <div className="py-2 flex justify-between w-full items-center flex-col md:flex-row gap-6 mb-8">
        <motion.div
          className="md:w-[50%] flex flex-col gap-3 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold font-serif tracking-wider text-gray-900">
            <span>Our</span> <span className="text-red-600">Church</span>{" "}
            <span>Gallery</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-600">
            Explore moments from our church community through worship services,
            outreach programs, and special events.
          </p>
        </motion.div>

        <motion.button
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  whileHover={{
    y: -3,
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.97,
  }}
  onClick={() => route.push("/gallery")}
  className="
    group
    relative
    cursor-pointer
    overflow-hidden
    rounded-2xl
    bg-gradient-to-r
    from-red-600
    to-pink-600
    px-8
    py-3.5
    font-semibold
    text-white
    shadow-[0_10px_25px_rgba(255,0,85,0.18)]
    transition-all
    duration-500
    hover:shadow-[0_8px_20px_rgba(255,0,85,0.35)]
  "
>
  {/* Shine Effect */}
  <span
    className="
      absolute
      left-[-120%]
      top-0
      h-full
      w-[50%]
      rotate-12
      bg-white/30
      blur-md
      transition-all
      duration-700
      group-hover:left-[130%]
    "
  />

  <span className="relative z-10">
    View Full Gallery
  </span>
</motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {images?.map((img, index) => {
          return (
            <motion.div
              key={index}
              className={`overflow-hidden rounded-2xl shadow-sm ${index === 1 || index === 3 ? "md:col-span-2" : "md:col-span-1"
                }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <ImageLoader
                containerClassName="h-[300px] w-full"
                className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-110"
                src={`${APIURL}/${img.image?.replace(/^\/+/, "")}`}
                alt="Church Gallery"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
