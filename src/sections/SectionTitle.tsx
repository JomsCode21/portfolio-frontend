interface SectionTitleProps {
  eyebrow: string;
  title: string;
  intro?: string;
}
export default function SectionTitle({ eyebrow, title, intro }: SectionTitleProps) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}
