import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "./Reveal";

import image1 from "@/assets/1.jpg";

import image3 from "@/assets/3.jpg";
import image4 from "@/assets/4.jpg";
import image5 from "@/assets/5.jpg";
import image6 from "@/assets/6.jpg";
import image7 from "@/assets/7.jpg";
import image8 from "@/assets/8.jpg";
import image9 from "@/assets/9.jpg";
import image10 from "@/assets/10.jpg";
import image11 from "@/assets/11.jpg";
import image12 from "@/assets/12.jpg";
import image13 from "@/assets/13.jpg";
import image14 from "@/assets/14.jpg";
import image15 from "@/assets/15.jpg";
import image16 from "@/assets/16.jpg";

const images = [
  {
    src: image1,
    alt: "De LUSH resort experience",
  },

  {
    src: image3,
    alt: "Fine dining experience",
  },
  {
    src: image4,
    alt: "Wellness experience",
  },
  {
    src: image5,
    alt: "Resort outdoor experience",
  },
  {
    src: image6,
    alt: "High tea experience",
  },
  {
    src: image7,
    alt: "De LUSH interiors",
  },
  {
    src: image8,
    alt: "Poolside experience",
  },
  {
    src: image9,
    alt: "Luxury resort experience",
  },
  {
    src: image10,
    alt: "Premium dining experience",
  },
  {
    src: image11,
    alt: "Luxury accommodation",
  },
  {
    src: image12,
    alt: "Resort ambience",
  },
  {
    src: image13,
    alt: "Premium hospitality experience",
  },
  {
    src: image14,
    alt: "De LUSH lifestyle experience",
  },
  {
    src: image15,
    alt: "Luxury leisure experience",
  },
  {
    src: image16,
    alt: "De LUSH resort moments",
  },
];

export function Gallery() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  /*
   * Go to next gallery image
   */
  const next = useCallback(() => {
    setCurrent((index) => (index + 1) % images.length);
  }, []);

  /*
   * Go to previous gallery image
   */
  const prev = useCallback(() => {
    setCurrent(
      (index) => (index - 1 + images.length) % images.length,
    );
  }, []);

  /*
   * Open fullscreen image
   */
  const openImage = useCallback((index: number) => {
    setOpen(index);
  }, []);

  /*
   * Next image inside lightbox
   */
  const nextLightbox = useCallback(() => {
    setOpen((index) =>
      index === null ? index : (index + 1) % images.length,
    );
  }, []);

  /*
   * Previous image inside lightbox
   */
  const prevLightbox = useCallback(() => {
    setOpen((index) =>
      index === null
        ? index
        : (index - 1 + images.length) % images.length,
    );
  }, []);

  /*
   * Scroll slider to active image
   */
  useEffect(() => {
    if (!sliderRef.current) return;

    const slide = sliderRef.current.children[
      current
    ] as HTMLElement | undefined;

    if (!slide) return;

    slide.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [current]);

  /*
   * Lightbox keyboard navigation
   */
  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
      }

      if (event.key === "ArrowRight") {
        nextLightbox();
      }

      if (event.key === "ArrowLeft") {
        prevLightbox();
      }
    };

    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, nextLightbox, prevLightbox]);

  return (
    <section id="gallery" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* ================================
            SECTION HEADING
        ================================= */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            The experience you&apos;re gifting
          </p>

          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            A weekend they will talk about at work
          </h2>
        </Reveal>

        {/* ================================
            GALLERY SLIDER
        ================================= */}
        <div className="relative mt-14">
          {/* Previous button */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="
              absolute
              left-2
              top-1/2
              z-20
              -translate-y-1/2
              rounded-full
              border
              border-gold-soft/50
              bg-[oklch(0.18_0.012_60/0.75)]
              p-3
              text-background
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[oklch(0.18_0.012_60/0.9)]
              sm:left-5
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* ================================
              IMAGE TRACK
          ================================= */}
          <div
            ref={sliderRef}
            className="
              flex
              snap-x
              snap-mandatory
              gap-5
              overflow-x-auto
              scroll-smooth
              px-[8%]
              pb-4
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            onTouchStart={(event) => {
              touchX.current =
                event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;

              const dx =
                (event.changedTouches[0]?.clientX ??
                  touchX.current) - touchX.current;

              if (dx < -50) {
                next();
              }

              if (dx > 50) {
                prev();
              }

              touchX.current = null;
            }}
          >
            {images.map((img, index) => (
              <Reveal
                key={img.src}
                delay={(index % 3) * 80}
                className="
                  min-w-[82%]
                  snap-center
                  sm:min-w-[58%]
                  md:min-w-[45%]
                  lg:min-w-[36%]
                "
              >
                <button
                  type="button"
                  onClick={() => openImage(index)}
                  aria-label={`View ${img.alt}`}
                  className="
                    group
                    relative
                    block
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-black/[0.03]
                    text-left
                    shadow-soft
                  "
                >
                  {/* 
                    IMPORTANT:
                    object-contain keeps the complete image visible.
                    No part of the image is cropped.
                  */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="
                      block
                      h-auto
                      max-h-[650px]
                      w-full
                      object-contain
                      transition-transform
                      duration-[900ms]
                      ease-out
                      group-hover:scale-[1.02]
                    "
                  />

                  {/* Subtle gradient */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/50
                      via-transparent
                      to-transparent
                      opacity-50
                      transition-opacity
                      duration-500
                      group-hover:opacity-80
                    "
                  />

                  {/* Image number */}
                  <span
                    className="
                      absolute
                      bottom-5
                      left-5
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.25em]
                      text-white/90
                    "
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="
              absolute
              right-2
              top-1/2
              z-20
              -translate-y-1/2
              rounded-full
              border
              border-gold-soft/50
              bg-[oklch(0.18_0.012_60/0.75)]
              p-3
              text-background
              shadow-lg
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[oklch(0.18_0.012_60/0.9)]
              sm:right-5
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* ================================
            DOT NAVIGATION
        ================================= */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${
                  current === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/40"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* ================================
          FULLSCREEN LIGHTBOX
      ================================= */}
      {open !== null && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-[oklch(0.18_0.012_60/0.94)]
            p-4
            backdrop-blur-md
            animate-in
            fade-in
            duration-300
          "
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={() => setOpen(null)}
          onTouchStart={(event) => {
            touchX.current =
              event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchX.current === null) return;

            const dx =
              (event.changedTouches[0]?.clientX ??
                touchX.current) - touchX.current;

            if (dx < -50) {
              nextLightbox();
            }

            if (dx > 50) {
              prevLightbox();
            }

            touchX.current = null;
          }}
        >
          {/* ================================
              CLOSE BUTTON
          ================================= */}
          <button
            type="button"
            aria-label="Close gallery"
            className="
              absolute
              right-5
              top-5
              z-30
              rounded-full
              border
              border-gold-soft/40
              bg-black/20
              p-2
              text-background
              backdrop-blur-sm
              transition-colors
              hover:bg-background/10
            "
            onClick={() => setOpen(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* ================================
              LIGHTBOX PREVIOUS
          ================================= */}
          <button
            type="button"
            aria-label="Previous image"
            className="
              absolute
              left-3
              z-30
              rounded-full
              border
              border-gold-soft/40
              bg-black/20
              p-3
              text-background
              backdrop-blur-sm
              transition-all
              hover:bg-background/10
              sm:left-8
            "
            onClick={(event) => {
              event.stopPropagation();
              prevLightbox();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* ================================
              LIGHTBOX IMAGE
          ================================= */}
          <figure
            className="
              relative
              flex
              max-h-[92vh]
              max-w-[92vw]
              flex-col
              items-center
              justify-center
            "
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={open}
              src={images[open].src}
              alt={images[open].alt}
              className="
                block
                max-h-[82vh]
                max-w-[90vw]
                rounded-xl
                object-contain
                shadow-luxe
                animate-in
                zoom-in-95
                fade-in
                duration-300
              "
            />

            <figcaption
              className="
                mt-4
                text-center
                text-sm
                tracking-wide
                text-background/80
              "
            >
              {images[open].alt}

              <span className="mx-2 text-primary">
                ·
              </span>

              {open + 1} / {images.length}
            </figcaption>
          </figure>

          {/* ================================
              LIGHTBOX NEXT
          ================================= */}
          <button
            type="button"
            aria-label="Next image"
            className="
              absolute
              right-3
              z-30
              rounded-full
              border
              border-gold-soft/40
              bg-black/20
              p-3
              text-background
              backdrop-blur-sm
              transition-all
              hover:bg-background/10
              sm:right-8
            "
            onClick={(event) => {
              event.stopPropagation();
              nextLightbox();
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}