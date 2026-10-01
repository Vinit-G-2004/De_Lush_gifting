import { Gem, Boxes, Sparkles, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const features = [
  {
    icon: Gem,
    title: "Uncompromised quality",
    body: "Every voucher opens into a genuine five-star experience — suites, Mayavi dining and wellness rituals.",
  },
  {
    icon: Boxes,
    title: "Built for bulk",
    body: "Order 20 to 2,000 vouchers with a single point of contact, consolidated invoicing and GST compliance.",
  },
  {
    icon: Sparkles,
    title: "Flexible redemption",
    body: "Recipients choose their own stay, meal or spa date — no rigid slots, no awkward exchanges.",
  },
  {
    icon: BadgeCheck,
    title: "Your brand, presented well",
    body: "Co-branded voucher design, custom messaging and premium presentation boxes for leadership gifting.",
  },
];

export function WhyDeLush() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--gradient-warm)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            Why De LUSH
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            Procurement-friendly. Recipient-approved.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 110}>
              <TiltCard intensity={8} className="h-full">
                <div className="surface-glass h-full rounded-2xl p-8">
                  <f.icon className="h-7 w-7 text-primary" strokeWidth={1.2} />
                  <h3 className="mt-6 font-display text-2xl">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
