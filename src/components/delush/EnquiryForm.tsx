import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { ENQUIRY_ENDPOINT } from "@/lib/delush-config";

const schema = z.object({
  company: z.string().trim().min(2, "Enter your company name").max(120),
  contact: z.string().trim().min(2, "Enter the contact person").max(100),
  designation: z.string().trim().min(2, "Enter a designation").max(100),
  email: z.string().trim().email("Enter a valid work email").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{8,18}$/, "Enter a valid phone number"),
  vouchers: z
    .string()
    .trim()
    .regex(/^\d{1,6}$/, "Enter a number of vouchers"),
  plan: z.string().min(1, "Select a preferred plan"),
  message: z.string().trim().max(1000).optional(),
});

type Fields = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  company: "",
  contact: "",
  designation: "",
  email: "",
  phone: "",
  vouchers: "",
  plan: "",
  message: "",
};

const plans = [
  "Experience Credit",
  "Afterglow",
  "Pause",
  "TopUp",
  "Not Sure Yet",
];

const fieldClass =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

export function EnquiryForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const set = (key: keyof Fields, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const next: Errors = {};

      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;

        if (!next[key]) {
          next[key] = issue.message;
        }
      }

      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});

    if (!ENQUIRY_ENDPOINT) {
      toast.error(
        "Enquiry destination not configured yet. Share the Google Apps Script URL to go live.",
      );
      return;
    }

    setSending(true);

    try {
      await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          ...parsed.data,
          source: "corporate",
          submittedAt: new Date().toISOString(),
        }),
      });

      toast.success(
        "Thank you — our corporate gifting team will be in touch.",
      );

      setValues(empty);
    } catch {
      toast.error("Could not send your enquiry right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const field = (
    key: keyof Fields,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>

      <input
        {...props}
        value={values[key] ?? ""}
        onChange={(e) => set(key, e.target.value)}
        className={`${fieldClass} mt-2`}
      />

      {errors[key] && (
        <span className="mt-1 block text-xs text-destructive">
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <section
      id="enquiry"
      className="bg-[image:var(--gradient-warm)] py-28"
    >
      <div className="mx-auto max-w-4xl px-6">

        <Reveal>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Corporate enquiry
            </p>

            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Request pricing for your gifting programme
            </h2>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="surface-glass mt-12 grid gap-6 rounded-2xl p-8 sm:grid-cols-2 sm:p-10"
          >
            {field("company", "Company name", {
              placeholder: "Acme Pvt Ltd",
            })}

            {field("contact", "Contact person", {
              placeholder: "Full name",
            })}

            {field("designation", "Designation", {
              placeholder: "HR Manager",
            })}

            {field("email", "Work email", {
              type: "email",
              placeholder: "name@company.com",
            })}

            {field("phone", "Phone", {
              placeholder: "+91 98765 43210",
            })}

            {field("vouchers", "Number of vouchers needed", {
              inputMode: "numeric",
              placeholder: "25",
            })}

            <label className="block sm:col-span-2">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Preferred plan
              </span>

              <select
                value={values.plan}
                onChange={(e) => set("plan", e.target.value)}
                className={`${fieldClass} mt-2`}
              >
                <option value="">Select a plan</option>

                {plans.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              {errors.plan && (
                <span className="mt-1 block text-xs text-destructive">
                  {errors.plan}
                </span>
              )}
            </label>

            <label className="block sm:col-span-2">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Message
              </span>

              <textarea
                rows={4}
                value={values.message ?? ""}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Timelines, branding needs, budget range…"
                className={`${fieldClass} mt-2 resize-none`}
              />
            </label>

            {/* Centered Submit Button */}
            <div className="flex justify-center sm:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="
                  inline-flex
                  min-w-[220px]
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[image:var(--gradient-gold)]
                  px-10
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-ink
                  shadow-soft
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Send className="h-4 w-4" />

                {sending ? "Sending…" : "Send enquiry"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}