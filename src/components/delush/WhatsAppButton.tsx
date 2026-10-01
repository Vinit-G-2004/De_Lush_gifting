import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/delush-config";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with De LUSH on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-ink shadow-luxe transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.6} />
    </a>
  );
}
