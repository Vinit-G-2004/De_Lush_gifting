import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import suite from "@/assets/9.jpg";
import dining from "@/assets/10.jpg";
import spa from "@/assets/11.jpg";
import lobby from "@/assets/3.jpg";

const products = [
  {
    name: "DeLUSH Experience Credit",
    oldPrice: "₹10,000",
    price: "₹8,500",
    badge: "Best for Bulk Orders",
    image: lobby,
    points: [
      "Flexible corporate voucher, redeemable across room, dining & wellness",
      "Brandable for corporate gifting programmes",
    ],
  },
  {
    name: "DeLUSH Afterglow",
    oldPrice: "₹11,500",
    price: "₹7,500",
    badge: "Most Popular",
    image: suite,
    points: [
      "1 night stay for two",
      "High Tea and breakfast included",
      "Mayavi lunch or dinner for two",
    ],
  },
  {
    name: "DeLUSH Pause",
    oldPrice: "₹7,500",
    price: "₹3,999",
    badge: null,
    image: dining,
    points: [
      "1 night stay for two",
      "High Tea on arrival",
      "Breakfast for two",
    ],
  },
  {
    name: "DeLUSH TopUp",
    oldPrice: null,
    price: "Premium add-on",
    badge: null,
    image: spa,
    points: [
      "Add a curated meal experience",
      "Add a signature spa session",
      "Premium voucher presentation for any tier",
    ],
  },
];

export function Products() {
  return (
    <section id="gifting" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            Corporate gifting collection
          </p>

          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Four ways to gift De LUSH
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 110}>
              <TiltCard className="group h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-luxe">
                  
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />

                    {p.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-[image:var(--gradient-gold)] px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ink">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl">
                      {p.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 flex items-center gap-2">
                      {p.oldPrice && (
                        <del className="text-sm text-muted-foreground/70 decoration-1">
                          {p.oldPrice}
                        </del>
                      )}

                      <span className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                        {p.price}
                      </span>

                      {/* + taxes only for Afterglow and Pause */}
                      {(p.name === "DeLUSH Afterglow" ||
                        p.name === "DeLUSH Pause") && (
                        <span className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                          + taxes
                        </span>
                      )}
                    </div>

                    <div className="rule-gold my-5 opacity-60" />

                    {/* Points */}
                    <ul className="flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    {/* Enquiry */}
                    <a
                      href="#enquiry"
                      className="mt-6 inline-block text-xs uppercase tracking-[0.22em] text-foreground underline-offset-8 transition-colors hover:text-primary hover:underline"
                    >
                      Enquire for bulk
                    </a>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
