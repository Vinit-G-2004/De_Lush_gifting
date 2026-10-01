import { Instagram, Facebook, Linkedin, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-background/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-background">De LUSH Resort</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
            Bavdhan, Pune, Maharashtra, India
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Campaign validity
          </p>
          <p className="mt-4 leading-relaxed">
            Gifting an Experience corporate rates are valid for the current
            campaign period. Vouchers are subject to availability, blackout
            dates and De LUSH Resort terms. Taxes extra where indicated.
          </p>
        </div>
        
      </div>
      <div className="border-t border-background/15 py-6 text-center text-xs tracking-wide text-background/55">
        © {new Date().getFullYear()} De LUSH Resort. All rights reserved.
      </div>
    </footer>
  );
}
