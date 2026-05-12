interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
        ? "text-right items-end"
        : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className="text-uppercase-tight text-primary">{label}</span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
