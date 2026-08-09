export default function FolderArchive({
  years,
  selectedYear,
  setSelectedYear,
  children,
}) {
  return (
    <section className="relative w-full max-w-[1100px] mx-auto mt-7 px-3 sm:px-0">
      <div
        className="
          absolute
          left-1/2
          top-40
          sm:top-56
          -translate-x-1/2
          w-[92vw]
          max-w-[900px]
          h-[300px]
          sm:h-[400px]
          md:h-[500px]
          bg-violet-600/20
          blur-[100px]
          sm:blur-[140px]
          md:blur-[180px]
          rounded-full
          -z-10
        "
      />

      <h2
        className="
          text-center
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-bold
          mb-6
          sm:mb-8
          tracking-[0.1em]
          sm:tracking-[0.15em]
          uppercase
          bg-gradient-to-r
          from-violet-300
          via-white
          to-violet-400
          bg-clip-text
          text-transparent
        "
      >
        Team Archive
      </h2>

      <div className="flex justify-center mb-5 sm:mb-6">
        <div
          className="
            h-1
            w-40
            sm:w-56
            md:w-72
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-violet-500
            to-transparent
            shadow-[0_0_15px_rgba(168,85,247,0.5)]
          "
        />
      </div>

      {/* Folder Tabs — UNCHANGED */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

     
      <div
        className="
          hide-scrollbar
          flex
          w-full
          px-2
          sm:px-5
          pt-3
          overflow-x-auto
          relative
          z-20
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          overflowY: "visible",
        }}
      >
        <div className="flex w-full min-w-max sm:min-w-0">
          {years.map((year, i) => {
            const isActive = selectedYear === year;
            const isFirst = i === 0;
            const isLast = i === years.length - 1;

            // KEY FIX #2: only round the OUTER corners of the whole tab
            // inner edge stays square so adjoining tabs butt together
            // with no rounded notch peeking through between them.
            // The active tab is elevated/scaled above its neighbors, so
            // it keeps full rounding on both top corners regardless of
            // position.
            const cornerClasses = isActive
              ? "rounded-t-[18px] sm:rounded-t-[22px] md:rounded-t-[26px]"
              : `
                  ${isFirst ? "rounded-tl-[18px] sm:rounded-tl-[22px] md:rounded-tl-[26px]" : "rounded-tl-none"}
                  ${isLast ? "rounded-tr-[18px] sm:rounded-tr-[22px] md:rounded-tr-[26px]" : "rounded-tr-none"}
                `;

            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  marginLeft: i === 0 ? 0 : "-10px",
                  zIndex: isActive ? 30 : years.length - i,
                }}
                className={`
                  relative
                  flex-1
                  min-w-[76px]
                  sm:min-w-[120px]
                  md:min-w-[150px]
                  max-w-[220px]
                  h-12
                  sm:h-14
                  md:h-16
                  ${cornerClasses}
                  px-2
                  sm:px-4
                  text-xs
                  sm:text-lg
                  md:text-xl
                  font-bold
                  whitespace-nowrap
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-violet-600
                        via-purple-500
                        to-fuchsia-500
                        text-white
                        scale-[1.05]
                        shadow-[0_10px_35px_rgba(124,58,237,0.45)]
                        border
                        border-violet-300/30
                      `
                      : `
                        bg-gradient-to-br
                        from-violet-500/10
                        via-fuchsia-500/5
                        to-violet-900/10
                        backdrop-blur-2xl
                        backdrop-saturate-150
                        border-t
                        border-x
                        border-white/10
                        text-gray-300
                        opacity-80
                        hover:from-violet-500/20
                        hover:via-fuchsia-500/10
                        hover:to-violet-900/20
                        hover:text-white
                        hover:-translate-y-[2px]
                        hover:opacity-100
                        hover:z-40
                      `
                  }
                `}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      {/*
        Folder body — now glassmorphism.
      */}
      <div
        className="
          mt-0
          rounded-b-[24px]
          sm:rounded-b-[34px]
          rounded-tr-[24px]
          sm:rounded-tr-[34px]
          rounded-tl-none
          bg-gradient-to-br
          from-violet-500/10
          via-fuchsia-500/5
          to-violet-900/10
          backdrop-blur-2xl
          backdrop-saturate-150
          border
          border-white/10
          shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_15px_40px_rgba(0,0,0,.45)]
          sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_30px_80px_rgba(0,0,0,.45)]
          min-h-[500px]
          sm:min-h-[600px]
          md:min-h-[750px]
          w-full
          p-6
          sm:p-10
          md:p-12
          lg:p-16
          relative
          z-10
        "
      >
        {children}
      </div>
    </section>
  );
}
