import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef();

  useEffect(() => {
    const frameCount = 90;

    const isMobile = window.innerWidth < 600;

    const frameFolder = isMobile ? "mobile_frames" : "frames";

    const currentFrame = (index) =>
      `/${frameFolder}/frame_${String(index).padStart(4, "0")}.jpg`;

    const images = [];
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 100;

    const frame = { current: 0 };

    const drawCover = (ctx, img) => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    };

    const render = () => {
      const img = images[Math.floor(frame.current)];

      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCover(context, img);
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    const tween = gsap.to(frame, {
      current: frameCount - 1,
      snap: "current",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=4800",
        scrub: true,
      },
      onUpdate: render,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    gsap.from(".ani", {
      y: 10,
      opacity: 0,
      delay: 0.2,
      stagger: 0.2,
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=3600",
        scrub: 0.3,
      },
    });

    tl.to({}, { duration: 1 })

    tl.to(".hero1", {
      opacity: 0,
      y: -50,
      duration: 1,
    })

      .to({}, { duration: 0.1 })

      .to(".hero3", {
        opacity: 1,
        y: 0,
        duration: 1,
      });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100dvh+4800px)]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        <div className="absolute top-0 left-0 z-30 h-full w-[100%] md:w-[60%] bg-gradient-to-r from-black/80 to-black/0">
          <div className="absolute inset-0 z-20 pointer-events-none">

            <div className="hero1 absolute bottom-12 left-6 sm:left-8">
              <h1 className="text-white uppercase h-[100dvh] flex flex-col justify-end gap-3 md:gap-0">
                <div className="ani text-5xl font-light md:text-7xl">
                  Every
                </div>
                <div className="ani text-7xl sm:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-700 bg-clip-text text-transparent md:text-9xl">
                  Voice
                </div>
                <div className="ani text-5xl sm:text-6xl font-light md:text-7xl">
                  Starts
                </div>
                <div className="ani text-5xl sm:text-6xl font-light md:text-7xl">
                  Somewhere
                </div>
              </h1>
            </div>

            <div className="hero3 absolute inset-0 opacity-0">
              <div className="absolute left-6 md:left-12 bottom-12 flex max-w-[24rem] flex-col gap-6">
                <p className="text-white text-6xl md:text-8xl uppercase">Express</p>
                <p className="text-violet-400 text-3xl md:text-5xl font-black uppercase">
                  to Inspire
                </p>
                <a
                  href="https://invictus10.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="pointer-events-auto text-sm md:text-md inline-flex w-fit rounded-full bg-violet-600 px-8 py-4 font-bold text-white transition-transform duration-200 ease-in-out hover:-translate-y-0.5">
                    Upcoming events →
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}