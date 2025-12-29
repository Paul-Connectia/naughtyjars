import Image from "../ui/Image";

const teams = [
  {
    image: "/about/girl.png",
    name: "Full Name",
    role: "Role",
  },
  {
    image: "/about/girl.png",
    name: "Full Name",
    role: "Role",
  },
  {
    image: "/about/girl.png",
    name: "Full Name",
    role: "Role",
  },
];

export default function Team() {
  return (
    <div>
      <h4 className="text-gray mb-10 text-3xl md:text-4xl lg:text-5xl">
        Meet The Team
      </h4>
      <p className="mb-10">"Naughty jars was born out of my love for authentic Tiramisu made with quality ingredients. My search for a perfectly balanced tiramisu ended when I finally mastered the recipe after a year of experimenting. I am delighted to share this recipe in our carefully crafted jars of the classic tiramisu and a list of growing flavour variations” -<span className="font-bold"> Moona Menez - Founder, Naughty Jars </span></p>
      <div className="flex gap-5 sm:gap-8 md:gap-10">
        {teams.map((t, idx) => (
          <div
            className="group relative cursor-pointer overflow-hidden rounded-2xl"
            key={idx}
          >
            <Image src={t.image} alt={t.name} className="sm:w-[22rem]" />
            <div className="absolute inset-0 hidden h-full w-full place-content-center bg-black/50 text-center text-white group-hover:block">
              <p className="text-xl">{t.name}</p>
              <p>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
