import type { ShowcaseFeature } from "@/lib/showcase";
import { ScreenshotPlate } from "./screenshot-plate";

export function FeatureRow({ feature }: { feature: ShowcaseFeature }) {
  const { eyebrow, title, body, bullets, plate, reverse } = feature;

  return (
    <div className="grid gap-10 border-t border-neutral-200 py-16 md:grid-cols-12 md:items-center md:gap-16 md:py-24">
      <div className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
        <p className="font-mono text-[10px] tracking-[0.28em] text-neutral-500">
          {eyebrow}
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-neutral-500">{body}</p>
        <ul className="mt-7 border-t border-neutral-200">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="border-b border-neutral-200 py-2.5 text-[13px] text-neutral-600"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
        <ScreenshotPlate plate={plate} />
      </div>
    </div>
  );
}
