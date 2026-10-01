import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "./Reveal";

import hero from "@/assets/1.jpg";
import suite from "@/assets/2.jpg";
import dining from "@/assets/3.jpg";
import spa from "@/assets/4.jpg";
import lawn from "@/assets/5.jpg";
import hightea from "@/assets/6.jpg";
import lobby from "@/assets/7.jpg";
import pool from "@/assets/8.jpg";

const images = [
  { src: hero, alt: "Resort pool deck at sunset" },
  { src: suite, alt: "Luxury suite" },
  { src: dining, alt: "Mayavi fine dining" },
  { src: spa, alt: "Spa treatment room" },
  { src: lawn, alt: "Event lawn at golden hour" },
  { src: hightea, alt: "High tea on the terrace" },
  { src: lobby, alt: "Resort lobby" },
  { src: pool, alt: "Poolside loungers" },
];

export function Gallery() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, []);

  const openImage = useCallback((index: number) => {
    setOpen(index);
  }, []);

  const nextLightbox = useCallback(() => {
    setOpen((i) => (i === null ? i : (i + 1) % images.length));
  }, []);

  const prevLightbox = useCallback(() => {
    setOpen((i) =>
      i === null ? i : (i - 1 + images.length) % images.length,
    );
  }, []);

  // Scroll slider to active image
  useEffect(() => {
    if (!sliderRef.current) return;

    const slide = sliderRef.current.children[current] as HTMLElement;

    if (slide) {
      slide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [current]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
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

        {/* Heading */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            The experience you&apos;re gifting
          </p>

          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            A weekend they will talk about at work
          </h2>
        </Reveal>

        {/* Slider */}
        <div className="relative mt-14">

          {/* Previous Button */}
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

          {/* Images */}
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
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;

              const dx =
                (e.changedTouches[0]?.clientX ?? touchX.current) -
                touchX.current;

              if (dx < -50) next();
              if (dx > 50) prev();

              touchX.current = null;
            }}
          >
            {images.map((img, index) => (
              <Reveal
                key={img.alt}
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
                    aspect-[4/5]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    text-left
                    shadow-soft
                  "
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-[900ms]
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  {/* Gradient */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/50
                      via-transparent
                      to-transparent
                      opacity-60
                      transition-opacity
                      duration-500
                      group-hover:opacity-90
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

          {/* Next Button */}
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

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
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

      {/* Fullscreen Lightbox */}
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
          onClick={() => setOpen(null)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;

            const dx =
              (e.changedTouches[0]?.clientX ?? touchX.current) -
              touchX.current;

            if (dx < -50) nextLightbox();
            if (dx > 50) prevLightbox();

            touchX.current = null;
          }}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            className="
              absolute
              right-5
              top-5
              z-30
              rounded-full
              border
              border-gold-soft/40
              p-2
              text-background
              transition-colors
              hover:bg-background/10
            "
            onClick={() => setOpen(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous */}
          <button
            type="button"
            aria-label="Previous"
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
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Image */}
          <figure
            className="relative max-h-[88vh] max-w-[88vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={open}
              src={images[open].src}
              alt={images[open].alt}
              className="
                max-h-[80vh]
                max-w-[88vw]
                rounded-xl
                object-contain
                shadow-luxe
                animate-in
                zoom-in-95
                fade-in
                duration-300
              "
            />

            <figcaption className="mt-4 text-center text-sm tracking-wide text-background/80">
              {images[open].alt}
              <span className="mx-2 text-primary">·</span>
              {open + 1} / {images.length}
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            aria-label="Next"
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
            onClick={(e) => {
              e.stopPropagation();
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