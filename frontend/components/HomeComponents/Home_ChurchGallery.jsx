import MainBtn from "@/utils/MainBtn";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API, APIURL } from "@/Core/rl";

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

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MainBtn
            onClick={() => route.push("/gallery")}
            text="View Full Gallery"
            customStyl="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors"
          />
        </motion.div>
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
              <img
                className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-110"
                src={`${APIURL}/${img.image?.replace(/^\/+/, "")}`}
                alt="Church Gallery"
                onError={(e) => {
                  e.target.src = "/fallback.jpeg"; // add a fallback image in public folder
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
