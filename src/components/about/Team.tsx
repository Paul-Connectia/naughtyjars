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
