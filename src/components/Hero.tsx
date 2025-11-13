import { useState, useEffect, useRef } from "react";
import { heroAPI, type HeroSection } from "@/lib/api";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSection[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const fetchHeroSections = async () => {
    try {
      const response = await heroAPI.getAll();
      setHeroSlides(response.data);
      videoRefs.current = new Array(response.data.length).fill(null);
    } catch (error) {
      console.error('Failed to fetch hero sections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSections();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (heroSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Handle video playback when slide changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide && heroSlides[index]?.fileType.startsWith("video")) {
          // Ensure video is ready and play
          const playVideo = async () => {
            try {
              if (video.readyState >= 2) {
                // Video is loaded enough to play
                await video.play();
              } else {
                // Wait for video to load
                video.addEventListener('canplay', () => {
                  video.play().catch((err) => {
                    console.error('Error playing video after load:', err);
                  });
                }, { once: true });
                video.load(); // Force reload if needed
              }
            } catch (error) {
              console.error('Error playing video:', error);
            }
          };
          playVideo();
        } else {
          // Pause other videos and reset them
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentSlide, heroSlides]);

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </section>
    );
  }

  if (heroSlides.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to Newgate Investments
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Building Dreams, Creating Value
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {slide.fileType.startsWith("image") ? (
            <img
              src={slide.fileUrl}
              alt={slide.tittle || "Hero slide"}
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : slide.fileType.startsWith("video") ? (
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
                if (el && index === currentSlide) {
                  // Ensure video plays when it becomes current
                  const playWhenReady = () => {
                    if (el.readyState >= 2) {
                      el.play().catch((err) => console.error('Video play error:', err));
                    } else {
                      el.addEventListener('canplay', () => {
                        el.play().catch((err) => console.error('Video play error:', err));
                      }, { once: true });
                    }
                  };
                  playWhenReady();
                }
              }}
              src={slide.fileUrl}
              className="w-full h-full object-cover absolute inset-0"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                if (index === currentSlide) {
                  e.currentTarget.play().catch((error) => {
                    console.error('Error auto-playing video:', error);
                  });
                }
              }}
              onCanPlay={(e) => {
                if (index === currentSlide) {
                  e.currentTarget.play().catch((error) => {
                    console.error('Error playing video on canplay:', error);
                  });
                }
              }}
              onError={(e) => {
                console.error('Video loading error:', e);
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div className="max-w-4xl animate-fade-in">
              {slide.tittle && (
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in">
                  {slide.tittle}
                </h1>
              )}
              {slide.description && (
                <p className="text-xl md:text-2xl text-white/90 animate-fade-in">
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Auto-animated dot indicators (non-clickable) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
            aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
