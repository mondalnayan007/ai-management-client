import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Swiper Modules
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Link } from "react-router";

const Slider = () => {
    const images = [
        {
            id: 1,
            src: "https://cdn.mos.cms.futurecdn.net/gHfBJ6FBHKnLbW36hEDvgV.png",
            alt: "Slide 1",
            title: "Google Gemini ",
            description: "Gemini is a multimodal AI model that can understand and generate text, images, and audio."
        },
        {
            id: 2,
            src: "https://www.wiz.ai/content/uploads/2025/09/Blog-images-scaled.jpg",
            alt: "Slide 2",
            title: "Suno AI Pro",
            description: "Suno AI is a music generation AI model that can create high-quality music from text prompts."
        },
        {
            id: 3,
            src: "https://www.cens.com/cens/news/2025/NPIC_38438.jpg",
            alt: "Slide 3",
            title: "Perplexity AI",
            description: "Perplexity AI is a search engine that uses AI to provide more accurate and relevant search results."
        },
        {
            id: 4,
            src: "https://i.ytimg.com/vi/4k1Q-gohR24/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCyLR6NuMPf7pt22NIsfB7msDEQeA",
            alt: "Slide 4",
            title: "ElevenLabs Prime Voice",
            description: "ElevenLabs Prime Voice is a text-to-speech AI model that can generate natural-sounding human-like voices."
        },
        {
            id: 5,
            src: "https://i.ibb.co.com/wFs2M8dP/IMG-20251128-001718.png",
            alt: "Slide 5",
            title: "Runway Gen-2 ",
            description: "This Runway Gen-2  is a video generation AI model that can create high-quality videos from text prompts."
        },
        {
            id: 6,
            src: "https://assets.st-note.com/production/uploads/images/125301682/rectangle_large_type_2_dee3bbe5b9fc3fb6eaae4118176d8065.png?fit=bounds&quality=85&width=1280",
            alt: "Slide 6",
            title: "Pika Labs",
            description: "Pika Labs is a video generation AI model that can create high-quality videos from text prompts."
        },
    ];

    return (
        <div className="my-10">
            <Swiper
                modules={[EffectCoverflow, Autoplay,]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1} // default mobile
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                speed={1000}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}

                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                }}
                className="relative"
            >
                {images.map((n) => (
                    <SwiperSlide key={n.id} className="relative">
                        <div className="relative">
                            <img
                                src={n.src}
                                alt={n.alt}
                                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
                            />
                            {/* Text Overlay */}
                            <div className="   text-white px-3 py-1 rounded">
                                <h3 className="absolute top-10 left-50 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    {n.title}
                                </h3>

                                <div className="absolute bottom-10 left-60">
                                    <Link
                                        className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-semibold"
                                        to={'/all-models'}
                                    >
                                        Explore 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
