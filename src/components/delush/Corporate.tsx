import { Reveal } from "./Reveal";

const occasions = [
  "Diwali gifting for key employees, clients and business partners",
  "Leadership and CXO recognition",
  "Key-client and partner appreciation",
  "Performance and milestone rewards",
  "Work anniversaries and long-service recognition",
  "Premium employee or client milestones",
];

export function Corporate() {
  return (
    <section
      id="corporate"
      className="relative overflow-hidden bg-background py-28 sm:py-32"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left content */}
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                Corporate
              </p>

              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                For business occasions
                <br />
                <span className="text-muted-foreground">
                  worth recognising
                </span>
              </h2>

              <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                Premium experiences thoughtfully curated for the people and
                partnerships that matter to your business.
              </p>

              <div className="mt-10 h-px w-20 bg-primary" />
            </div>
          </Reveal>

          {/* Right list */}
          <div className="grid gap-3 sm:grid-cols-2">
            {occasions.map((occasion, index) => (
              <Reveal key={occasion} delay={(index % 2) * 100}>
                <div
                  className="
                    group
                    relative
                    min-h-[150px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border/70
                    bg-card/60
                    p-6
                    shadow-soft
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-primary/40
                    hover:shadow-luxe
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      absolute
                      right-5
                      top-4
                      font-display
                      text-4xl
                      font-semibold
                      text-primary/10
                      transition-colors
                      duration-500
                      group-hover:text-primary/20
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Accent */}
                  <div className="mb-8 h-px w-8 bg-primary transition-all duration-500 group-hover:w-14" />

                  <p className="max-w-xs text-base font-medium leading-6 text-foreground">
                    {occasion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <Reveal delay={150}>
          <div className="mt-16 border-t border-border/60 pt-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  Make it memorable
                </p>

                <p className="mt-3 max-w-2xl font-display text-2xl font-medium leading-tight sm:text-3xl">
                  Give your people an experience they will remember long after
                  the occasion.
                </p>
              </div>

              <a
                href="#enquiry"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-primary
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-primary
                  transition-all
                  duration-300
                  hover:bg-primary
                  hover:text-primary-foreground
                "
              >
                Enquire for Corporate Gifting
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}