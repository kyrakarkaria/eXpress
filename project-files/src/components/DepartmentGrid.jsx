import { useRef, useState } from "react";
import MemberCard from "./MemberCard";

export default function DepartmentGrid({ departments, placeholderImage,namesOnly = false, }) {
  const deptKeys = Object.keys(departments || {});
  const [activeDept, setActiveDept] = useState(deptKeys[0] || "");
  const sectionRefs = useRef({});

  if (deptKeys.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">No members added yet.</p>
    );
  }

  const scrollToDept = (dept) => {
    setActiveDept(dept);
    sectionRefs.current[dept]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Department buttons */}
    <div className="flex justify-center mb-10">

  <select
    value={activeDept}
    onChange={(e) => scrollToDept(e.target.value)}
    className="
      w-full
      max-w-sm
      px-5
      py-3
      rounded-xl
      bg-[#1D1135]
      border
      border-violet-500/30
      text-white
      text-lg
      font-semibold
      outline-none
      cursor-pointer
      hover:border-violet-400
      focus:border-violet-400
      transition-all
    "
  >
    {deptKeys.map((dept) => (
      <option key={dept} value={dept}>
        {dept}
      </option>
    ))}
  </select>

</div>

      {/* Scrollable department sections */}
     
   
      <div className="mt-10">
        {deptKeys.map((dept) => {
          const members = departments[dept] || [];
          return (
            <section
              key={dept}
              ref={(el) => (sectionRefs.current[dept] = el)}
              className="10 scroll-mt-6 last:mb-0"
            >
              <h3
                className="
                  font-mono
                  text-2xl
                  font-bold
                  text-center
                  mt-6
                  mb-6
                  uppercase
                  tracking-widest
                  text-violet-300
                "
              >
                {dept}
              </h3>

              <div
  className={
    namesOnly
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-10" 
      : members.length === 1
      ? "flex justify-center"
      : "grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center"
  }
>
                {members.length === 0 ? (
                  <p className="text-center text-gray-400">
                    No members added yet.
                  </p>
                ) : (
                 members.map((member, i) => (

  namesOnly ?(

    <p
  key={member.id ?? `${dept}-${member.name}-${i}`}
  className="
    font-serif
    text-lg
    text-white
    text-center
    py-2
  "
>
   • {member.name}
</p>

  ) : (

    <MemberCard
      key={member.id ?? `${dept}-${member.name}-${i}`}
      name={member.name}
      position={member.position}
      image={member.image || placeholderImage}
      linkedin={member.linkedin}
     
    />

  )

))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
