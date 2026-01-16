import Image from "../ui/Image";

const teams = [
  {
    image: "/about/moona.jpg",
    name: "Moona Menezes",
    role: "Founder",
    message:
      "“Naughty jars was born out of my love for authentic Tiramisu made with quality ingredients. My search for a perfectly balanced tiramisu ended when I finally mastered the recipe after a year of experimenting. I am delighted to share this recipe in our carefully crafted jars of the classic tiramisu and a list of growing flavour variations”",
  }
];

export default function Team() {
  return (
    <div>
      <h4 className="text-gray mb-10 text-3xl md:text-4xl lg:text-5xl">
        Meet The Founder
      </h4>

      <div className="flex justify-center">
        {teams.map((t, idx) => (
          <div
            key={idx}
            className="perspective w-[22rem] h-[28rem] cursor-pointer"
          >
            <div className="flip-inner">
              {/* FRONT */}
              <div className="flip-front">
                <Image
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* BACK */}
              <div className="flip-back bg-[#606060] text-white rounded-2xl
                              flex flex-col items-center justify-center
                              p-6 text-center">
                <p className="text-xl font-semibold">{t.name}</p>
                <p className="text-sm mb-4 opacity-80">{t.role}</p>
                <p className="text-sm italic">{t.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}