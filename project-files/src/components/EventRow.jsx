import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventRow({ event, index, reversed }) {
  const rootRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const numberRef = useRef(null);
  const dotRef = useRef(null);
  const [slide, setSlide] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        numberRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )
        .fromTo(
          imgWrapRef.current,
          { opacity: 0, x: reversed ? 60 : -60, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          imgRef.current,
          { scale: 1.18 },
          { scale: 1, duration: 1.2 },
          "-=0.9"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.65"
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );

      // timeline dot lights up as the row engages
      gsap.fromTo(
        dotRef.current,
        { boxShadow: "0 0 0 0 rgba(139,92,246,0)" },
        {
          boxShadow: "0 0 0 6px rgba(139,92,246,0.18)",
          backgroundColor: "#8b5cf6",
          duration: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            end: "top 42%",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reversed]);

  return (
    <div
      className={`relative grid items-center gap-[150px] max-[860px]:grid-cols-1 max-[860px]:gap-[26px] max-[860px]:mb-[80px] last:mb-0 ${reversed
        ? "grid-cols-[minmax(0,1fr)_minmax(0,460px)]"
        : "grid-cols-[minmax(0,460px)_minmax(0,1fr)]"
        }`}
      ref={rootRef}
      id={event.id}
    >
      {/* kept in the DOM to match the original markup; hidden to match the
          original site's (unused) timeline-dot styling */}
      <div
        className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2a2333] z-[10]"
        ref={dotRef}
      />

      <div
        className={`relative group ${reversed ? "min-[861px]:order-2" : ""}`}
        ref={imgWrapRef}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="relative rounded-[18px] overflow-hidden border border-[#8b5cf6] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.08)] aspect-[4/3] max-[860px]:aspect-[16/10] bg-bg-soft after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_55%,rgba(6,5,9,0.55)_100%)] after:pointer-events-none">
          <div className="w-full h-full overflow-hidden relative">
            <div
              ref={imgRef}
              className="flex h-full w-full transition-transform duration-500"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {(event.images ?? (event.image ? [event.image] : [])).map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`${event.title} ${i + 1}`}
                  loading="lazy"
                  className="w-full flex-shrink-0 h-full object-cover block transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.06]"
                  ref={(el) => {
                    if (i === 0) imgRef.current = el;
                  }}
                />
              ))}
            </div>

            {(event.images ?? []).length > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center"
                  onClick={() =>
                    setSlide((s) => (s - 1 + event.images.length) % event.images.length)
                  }
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-9 h-9 flex items-center justify-center"
                  onClick={() => setSlide((s) => (s + 1) % event.images.length)}
                  aria-label="Next image"
                >
                  ›
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
                  {event.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`w-2 h-2 rounded-full ${i === slide ? "bg-white" : "bg-white/40"
                        }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <span
          className={`absolute -top-3.5 w-[46px] h-[46px] rounded-full bg-bg border border-border-soft flex items-center justify-center font-display font-bold text-[0.85rem] text-purple-light z-[2] ${reversed
            ? "-right-3.5 left-auto max-[860px]:-left-2.5 max-[860px]:right-auto"
            : "-left-3.5"
            }`}
          ref={numberRef}
        >
          {event.number}
        </span>
      </div>

      <div
        className={`flex flex-col gap-3.5 ${reversed ? "min-[861px]:order-1" : ""}`}
      >
        {event.tag && (
          <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-purple-light opacity-85">
            {event.tag}
          </span>
        )}
        <h3
          className="font-serif-brew font-extrabold text-[clamp(1.7rem,3vw,2.5rem)] m-0 bg-[linear-gradient(135deg,#c4b5fd,#8b5cf6)] bg-clip-text text-transparent"
          ref={titleRef}
        >
          {event.title}
        </h3>
        <p className="m-0 font-sans text-text-dim text-base leading-[1.75] max-w-[50ch]" ref={bodyRef}>
          {event.description}
        </p>
      </div>
    </div>
  );
}
