interface SectionTitleProps {
  eyebrow: string;
  title: string;
  intro?: string;
}
export default function SectionTitle({ eyebrow, title, intro }: SectionTitleProps) {
  return (
    <div className="mb-11 max-w-[700px] md:mb-14">
      <span className="mb-[17px] block font-['DM_Mono'] text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#38bdf8]">
        {eyebrow}
      </span>
      <h2 className="m-0 text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.08] font-extrabold tracking-[-0.045em] text-[#e7edf7]">
        {title}
      </h2>
      {intro && <p className="mt-[18px] mb-0 text-[0.95rem] text-[#9aa8bd] md:text-base">{intro}</p>}
    </div>
  );
}
