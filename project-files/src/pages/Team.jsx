import React, { useState } from "react";
import { teams, leadership } from "../data/teams";
import FolderArchive from "../components/FolderArchive";
import FacultyCard from "../components/FacultyCard";
import DepartmentGrid from "../components/DepartmentGrid";

export default function Team() {
  const placeholderImage = "https://placehold.co/300x300?text=Placeholder";

  const [selectedYear, setSelectedYear] = useState("2026-2027");
  const [activeTab, setActiveTab] = useState("core");

  const currentYear = teams[selectedYear];

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <>
   
  

    <div
      className="
      
      bg-black
        text-white
        px-4
sm:px-6
lg:px-10
py-6
        flex
        flex-col
        items-center
      "
    >
      {/* HERO */}
      <section
        className="
          relative
          flex
          flex-col
          items-center
          justify-center
          text-center
         min-h-[42vh]
          w-full
          overflow-hidden
        "
      >
        {/* Starfield */}
        <div className="absolute inset-0 -z-20 pointer-events-none">
          {[
            [4, 8], [9, 22], [14, 5], [18, 34], [22, 15], [27, 40],
            [31, 9], [36, 28], [41, 18], [46, 6], [52, 33], [58, 12],
            [63, 24], [67, 45], [72, 8], [77, 30], [81, 17], [86, 38],
            [91, 10], [95, 26], [12, 48], [23, 55], [35, 50], [48, 58],
            [61, 52], [74, 56], [88, 48], [6, 32], [55, 20], [70, 15],
          ].map(([left, top], i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: i % 3 === 0 ? "3px" : "2px",
                height: i % 3 === 0 ? "3px" : "2px",
                opacity: 0.3 + (i % 5) * 0.12,
              }}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs md:text-sm tracking-[4px] uppercase tracking-[0.18em] text-fuchsia-300 font-mono">
            — MEET THE TEAM —
          </span>
        </div>

        <h1
          className="
            font-serif
            text-5xl
md:text-7xl
            tracking-wide
            text-white
          "
        >
          <span className="font-bold">Our</span>{" "}
          <span className="italic font-normal text-fuchsia-200">Team</span>
        </h1>
        <p
          className="
            mt-5
            max-w-3xl
            text-lg
            md:text-xl
            leading-7
            text-gray-300
          "
        >
          Meet our dedicated team of public speaking and debate enthusiasts
          who work tirelessly to organize events and workshops for our
          community.
        </p>
        
        <div
          className="
            mt-15
            flex
            flex-col
            items-center
            text-gray-400
            animate-bounce
          "
        >
          
        </div>
      </section>

      {/* FACULTY  & PRINCIPAL*/}
      <div className="  mt-20 mb-12 w-full">
        <h2 className="font-serif text-4xl font-bold text-center"> Principal </h2>
        <div
          className="
            w-72
            h-1
            bg-gradient-to-r
            from-violet-500
            via-purple-400
            to-fuchsia-500
            mx-auto
            rounded-full
            mt-4
            mb-6
          "
        />
         <div className="flex flex-wrap justify-center gap-12">
         <FacultyCard {...leadership.principal} />
        </div>
        
        <h2 className="font-serif mt-10 text-4xl font-bold text-center">Faculty</h2>

        <div
          className="
            w-72
            h-1
            bg-gradient-to-r
            from-violet-500
            via-purple-400
            to-fuchsia-500
            mx-auto
            rounded-full
            mt-4
            mb-6
          "
        />

        <div className="flex flex-wrap justify-center gap-12">
         
          <FacultyCard {...leadership.faculty} />
        </div>
      </div>

      {/* ARCHIVE */}
      <div className="mt-5 flex flex-col w-full">
        <FolderArchive 
          years={Object.keys(teams)}
          selectedYear={selectedYear}
          setSelectedYear={handleYearChange}
        >
         

          {/* TAB TOGGLE */}
          <div className="flex justify-center mt-8">
            <div
              role="tablist"
              aria-label="Team category"
              className="
                relative
                flex
                w-full
                max-w-md
                h-16
                rounded-full
                bg-[#1A1230]
                border
                border-violet-500/30
                p-1
                shadow-[0_0_30px_rgba(124,58,237,0.25)]
                overflow-hidden
              "
            >
              <div
                className={`
                  absolute
                  top-1
                  bottom-1
                  w-[calc(50%-4px)]
                  rounded-full
                  bg-gradient-to-r
                  from-violet-600
                  to-purple-500
                  shadow-[0_0_25px_rgba(124,58,237,.45)]
                  transition-all
                  duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]
                  ${activeTab === "core" ? "left-1" : "left-[calc(50%+2px)]"}
                `}
              />

              <button
                role="tab"
                aria-selected={activeTab === "core"}
                onClick={() => setActiveTab("core")}
                className="
                  relative
                  z-10
                  flex-1
                  font-semibold
                  text-lg
                  rounded-full
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-300
                "
              >
                <span
                  className={
                    activeTab === "core" ? "text-white" : "text-gray-400"
                  }
                >
                  Core
                </span>
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "associates"}
                onClick={() => setActiveTab("associates")}
                className="
                  relative
                  z-10
                  flex-1
                  font-semibold
                  text-lg
                  rounded-full
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-300
                "
              >
                <span
                  className={
                    activeTab === "associates" ? "text-white" : "text-gray-400"
                  }
                >
                  Associates
                </span>
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-10">
            {activeTab === "core" ? (
              <DepartmentGrid
                key={`core-${selectedYear}`}
                departments={currentYear.core}
                placeholderImage={placeholderImage}
              />
            ) : (
              <DepartmentGrid
                key={`associates-${selectedYear}`}
                departments={currentYear.associates}
                namesOnly={true}
              />
            )}
          </div>
           <div className="rounded-[32px] overflow-hidden shadow-xl relative">
            <div
              className="
                relative
                mt-8
                overflow-hidden
                rounded-[30px]
                border
                border-violet-500/30
                shadow-[0_15px_50px_rgba(124,58,237,.25)]
              "
            >
              <img
                src={currentYear.groupPhoto}
                alt={`${selectedYear} group photo`}
                className="
                  w-full
                  h-72
md:h-[420px]
lg:h-[480px]
                  object-cover
                  transition-all
                  duration-700
                  hover:scale-105
                "
              />
              <div className="absolute bottom-8 left-8">
                <p className="font-mono uppercase tracking-[0.15em] text-sm text-violet-300">
                  Year
                </p>
                <h2 className="font-serif text-5xl font-bold">{selectedYear}</h2>
              </div>
            </div>
          </div>
        </FolderArchive>
      </div>
    </div>
    </>
  );
}
