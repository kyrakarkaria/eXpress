import React from "react";

const FacultyCard = ({ name, position, image }) => {
  return (
    <div
      className="
        relative
        w-full
        max-w-[200px]
        sm:max-w-[220px]
        md:max-w-[240px]
        lg:max-w-[270px]
        p-7
        sm:p-8
        md:p-9
        lg:p-10
        bg-gradient-to-br
        from-violet-950/40
        via-purple-950/30
        to-black/40
        backdrop-blur-xl
        backdrop-saturate-150
        border
        border-violet-500/15
        shadow-[0_8px_32px_rgba(31,8,68,0.37)]
        rounded-2xl
        sm:rounded-3xl
        overflow-hidden
        flex
        flex-col
        items-center
        text-center
        transition-all
        duration-300
        hover:from-violet-950/50
        hover:via-purple-950/40
        hover:to-black/50
        hover:-translate-y-2
        hover:scale-105
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
          rounded-2xl
          sm:rounded-3xl
        "
      />

      <img
        src={image}
        alt={name}
        className="
          relative
          z-10
           w-20 h-20
    sm:w-22 sm:h-22
    md:w-24 md:h-24
    lg:w-28 lg:h-28
    xl:w-30 xl:h-30

    rounded-full
    object-cover
    border-2
    md:border-4
    border-violet-400/70
          shadow-[0_4px_20px_rgba(168,85,247,0.35)]
        "
      />

      <h2
        className="
          relative
          z-10
          mt-4
          sm:mt-5
          md:mt-6
          font-serif
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
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
          mt-2
          font-mono
          uppercase
          tracking-tight
          text-xs
          sm:text-sm
          text-violet-300
        "
      >
        {position}
      </p>
    </div>
  );
};

export default FacultyCard;
