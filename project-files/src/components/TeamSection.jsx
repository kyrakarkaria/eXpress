import MemberCard from "./MemberCard";
 const TeamSection = ({ title, members }) => {
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">

      <h2
        className="
          font-serif
          text-4xl
          font-bold
          tracking-wide
          text-center
          text-white
          mb-10
        
        "
      >
        {title}
      </h2>

      <div
        className="
           flex
    flex-wrap
    justify-center
    gap-10
    max-w-5xl
    mx-auto
        "
      >
        {members.map((member) => (
          <MemberCard
            key={member.id}
            {...member}
          />
        ))}
      </div>
      <div
  className="
    w-72
    h-1.5
    bg-gradient-to-r
    from-violet-500
    via-purple-400
    to-fuchsia-500
    rounded-full
    mx-auto
    mt-4
    mb-24
    shadow-[0_0_15px_rgba(168,85,247,0.6)]
  "
/>

    </section>
  );
}
export default TeamSection;
