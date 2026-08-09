import React, { useState, useEffect } from "react";

// Extensions to try, in order, when `image` is passed WITHOUT an extension
// e.g. image="/teams/2025-2026/core/dhruv-thakur"
const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic"];

const MemberCard = ({ name, position, image }) => {
  const hasExtension = image ? /\.(jpg|jpeg|png|webp)$/i.test(image) : false;

  const [extIndex, setExtIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Reset when the member (and thus image) changes
  useEffect(() => {
    setExtIndex(0);
    setImgError(false);
  }, [image]);

  // If image already has an extension, use it as-is; otherwise build it
  const resolvedSrc = hasExtension
    ? image
    : image
    ? `${image}.${EXTENSIONS[extIndex]}`
    : null;

  const handleError = () => {
    if (!hasExtension && extIndex < EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1); // try the next extension
    } else {
      setImgError(true); // give up, show initials fallback
    }
  };

  return (
    <div
      className="
    relative
    w-full
    max-w-[180px]
    sm:max-w-[210px]
    md:max-w-[240px]
    lg:max-w-[260px]
    xl:max-w-[280px]

    p-4
    sm:p-5
    md:p-6
    lg:p-7

    rounded-xl
    sm:rounded-2xl
    lg:rounded-3xl

    bg-gradient-to-br
    from-violet-950/40
    via-purple-950/30
    to-black/40
    backdrop-blur-xl
    backdrop-saturate-150
    border
    border-violet-500/15
    shadow-[0_8px_32px_rgba(31,8,68,0.37)]

    overflow-hidden

    flex
    flex-col
    items-center

    transition-all
    duration-300
    hover:from-violet-950/50
    hover:via-purple-950/40
    hover:to-black/50
    hover:-translate-y-2
    hover:border-violet-400/50
    hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
  "
    >
      {/* glass sheen overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.08]
          via-white/[0.02]
          to-transparent
          rounded-xl
          sm:rounded-2xl
          lg:rounded-3xl
        "
      />

      {resolvedSrc && !imgError ? (
        <img
          src={resolvedSrc}
          alt={name}
          onError={handleError}
          className="
            relative
            z-10
            w-16 h-16
    sm:w-20 sm:h-20
    md:w-24 md:h-24
    lg:w-28 lg:h-28
    xl:w-32 xl:h-32

    rounded-full
    object-cover
    border-2
    md:border-4
    border-violet-400/70
    shadow-[0_4px_20px_rgba(168,85,247,0.35)]
          "
        />
      ) : (
        <div
          className="
          relative
          z-10
          mt-2
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-28 lg:h-28
            xl:w-32 xl:h-32
            rounded-full
            bg-gradient-to-br
            from-violet-600/80
            to-purple-500/80
            backdrop-blur-md
            border
            border-white/20
            flex
            items-center
            justify-center
            text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
            font-bold
            text-white
          "
        >
          {name ? name.charAt(0) : "?"}
        </div>
      )}

      <h2
        className="
          relative
          z-10
          mt-3
          sm:mt-4
          font-serif
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
          text-center
          leading-tight
          text-white
        "
      >
        {name}
      </h2>
      <p
        className="
          relative
          z-10
          font-mono
          uppercase
          tracking-tight
          text-purple-300
          mt-1
           text-xs
    sm:text-sm
    md:text-base

          text-center
        "
      >
        {position}
      </p>
    </div>
  );
};

export default MemberCard;
