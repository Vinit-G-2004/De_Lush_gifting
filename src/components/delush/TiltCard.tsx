import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  intensity = 10,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{ transform: string }>({
    transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)",
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(1100px) rotateX(${(-py * intensity).toFixed(2)}deg) rotateY(${(px * intensity).toFixed(2)}deg) translateZ(14px)`,
    });
  };

  const reset = () =>
    setStyle({
      transform:
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)",
    });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={style}
      className={cn(
        "transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}
