import { useEffect, useState } from "react";
import heroImg from "@/assets/8.jpg";
import { Reveal } from "./Reveal";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 -z-20 scale-110"
        style={{
          transform: `translateY(${offset * 0.25}px) scale(1.12)`,
        }}
      >
        <img
          src={heroImg}
          alt="De LUSH Resort at golden hour"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.24_0.016_60/0.84),oklch(0.24_0.016_60/0.38))]" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:items-center">

        <div>

          {/* Location */}
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-gold-soft sm:text-base">
              De LUSH Resort · Bavdhan, Pune
            </p>
          </Reveal>

          {/* Main Heading */}
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-background sm:text-7xl lg:text-8xl">
              Gifting an{" "}
              <span className="text-gold-gradient italic">
                Experience
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={240}>
            <p className="mt-7 max-w-xl text-lg font-medium leading-relaxed text-background/90 sm:text-xl lg:text-[1.35rem]">
              Corporate gifts your teams and clients actually remember —
              stays, dining at Mayavi and wellness escapes, delivered as
              elegant, brandable vouchers.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#enquiry"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-[image:var(--gradient-gold)]
                  px-9
                  py-4
                  text-base
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-ink
                  shadow-luxe
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                Request a corporate quote
              </a>
            </div>
          </Reveal>
        </div>

        {/* Corporate Voucher */}
        <Reveal delay={420} className="hidden md:block">
          <div
            className="animate-float [transform-style:preserve-3d]"
            style={{
              transform: `translateY(${offset * -0.06}px)`,
            }}
          >
            <div className="surface-glass mx-auto max-w-sm rotate-[-4deg] rounded-2xl p-8">

              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                <span>De LUSH</span>
                <span>Corporate</span>
              </div>

              <p className="mt-8 font-display text-3xl font-semibold text-foreground">
                Experience Credit
              </p>

              <p className="mt-2 text-base font-medium text-muted-foreground">
                Redeemable across stay, dining &amp; wellness
              </p>

              <div className="rule-gold my-6" />

              <div className="flex items-end justify-between">
                <span className="font-display text-4xl font-bold text-foreground">
                  ₹10,000
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Starting value
                </span>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}