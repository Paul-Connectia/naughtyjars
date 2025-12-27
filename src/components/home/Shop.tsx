import MaxContainer from "@/layout/MaxContainer";
import { Link } from "react-router-dom";

const dummyImages = [
  { img: "/nhs.png", page: "/products/1", label: "Original Jars (250ml)" },
  { img: "/nhss.png", page: "/products/2", label: "Petite Jars (500ml)" },
  { img: "/sjhd.png", page: "/products/3", label: "Combo Boxes" },
];

export default function Shop() {
  return (
    <MaxContainer className="px-5 py-10 sm:px-8 md:px-10">
      <h4 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
        Shop Online
      </h4>
      <p className="text-gray max-w-5xl text-left text-base leading-relaxed md:text-lg">
        Discover indulgence at your fingertips !
        <br />
        Explore our curated collection, select your favourites, and have our
        signature delights delivered fresh to your door.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8 md:grid-cols-3 md:gap-10">
        {dummyImages.map((item, index) => (
          <div className="w-full text-center" key={index}>
            <Link to={item.page} className="group block">
              <div
                className="relative mb-3 w-full overflow-hidden"
                style={{ paddingBottom: "100%" }}
              >
                <img
                  src={item.img}
                  alt={`Product ${index + 1}`}
                  className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.15]"
                />

                {/* ✅ Label overlay now visible on hover */}
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="w-full bg-yellow-800/85 py-2 font-semibold text-white">
                    {item.label}
                  </span>
                </div>
              </div>

              <button className="bg-yellow cursor-pointer rounded-3xl px-5 py-1.5 text-lg text-white transition-colors duration-300 hover:bg-yellow-800/75 sm:px-8">
                Shop Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </MaxContainer>
  );
}

// const CurvedMarqueeItem = ({ member }: { member: Member; idx: number }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [xPos, setXPos] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useAnimationFrame(() => {
//     if (ref.current) {
//       const rect = ref.current.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const screenCenter = window.innerWidth / 2;
//       const offset = (centerX - screenCenter) / (window.innerWidth / 2);
//       setXPos(offset);
//     }
//   });

//   const rotateY = xPos * -35;
//   const translateZ = Math.abs(xPos) * -180;
//   const translateY = Math.abs(xPos) * 50;

//   console.log("[v0] Hover state:", isHovered, "for member:", member.name);

//   return (
//     <div
//       ref={ref}
//       style={{
//         perspective: "1200px",
//         transformStyle: "preserve-3d",
//       }}
//       className="shrink-0"
//       onMouseEnter={() => {
//         console.log("[v0] Mouse entered:", member.name);
//         setIsHovered(true);
//       }}
//       onMouseLeave={() => {
//         console.log("[v0] Mouse left:", member.name);
//         setIsHovered(false);
//       }}
//     >
//       <MotionDiv
//         style={{
//           rotateY: `${rotateY}deg`,
//           z: translateZ,
//           y: translateY,
//         }}
//         whileHover={{
//           scale: 1.1,
//           y: -20,
//           z: 100,
//           transition: { duration: 0.9, ease: "easeOut" },
//         }}
//         className="relative w-[180px] md:w-[280px] aspect-3/4 rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-4 border-white bg-gray-100 transform-gpu transition-all duration-500 cursor-pointer"
//       >
//         <img
//           src={member.image || "/placeholder.svg"}
//           alt={member.name}
//           className="w-full h-full object-cover"
//           style={{
//             filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
//             transition: "filter 0.5s ease-in-out",
//           }}
//         />

//         <div
//           className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8"
//           style={{
//             opacity: isHovered ? 1 : 0,
//             transition: "opacity 0.5s ease-in-out",
//           }}
//         >
//           <p className="text-white font-black text-xs uppercase tracking-widest mb-1">
//             {member.name}
//           </p>
//           <p className="text-[#C21B23] text-[9px] uppercase font-bold tracking-widest">
//             {member.designation || "Executive Board"}
//           </p>
//           <p className="text-[#C21B23] text-[9px] uppercase font-bold tracking-widest">
//             {member.company_name || "Executive Board"}
//           </p>
//         </div>
//       </MotionDiv>
//     </div>
//   );
// };
//  const marqueeMembers = [ ...presentMembers,...presentMembers, ...presentMembers,];
// <section className="w-full pt-10 pb-20">
// <div className="max-w-[1440px] mx-auto text-center px-4">
//   <MotionDiv
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     className="mb-4"
//   >
//     <h3 className="text-3xl md:text-4xl lg:text-5xl text-[#C21B23] font-light tracking-tighter leading-none mb-4">
//       Leadership Rooted in Experience. <br />
//       Support That Drives Progress.
//     </h3>
//   </MotionDiv>
// </div>

// {/* --- INFINITE MARQUEE OF PORTRAITS (3D ARC EFFECT) --- */}
// <div className="relative w-full overflow-hidden py-24 bg-white perspective-2000">
//   <style>{`
//     @keyframes scrollMembers {
//       0% { transform: translateX(0); }
//       100% { transform: translateX(-50%); }
//     }
//     .animate-marquee-members {
//       animation: scrollMembers 70s linear infinite;
//     }
//     .animate-marquee-members:hover {
//       animation-play-state: paused;
//     }
//   `}</style>

//   <div className="flex gap-8 animate-marquee-members px-20">
//     {marqueeMembers.map((member: Member, idx: number) => (
//       <CurvedMarqueeItem
//         key={`${member.id}-${idx}`}
//         member={member}
//         idx={idx}
//       />
//     ))}
//   </div>

//   {/* Vignette Overlays for Depth */}
//   <div className="absolute inset-y-0 left-0 w-80 bg-linear-to-r from-white via-white/40 to-transparent z-10 pointer-events-none"></div>
//   <div className="absolute inset-y-0 right-0 w-80 bg-linear-to-l from-white via-white/40 to-transparent z-10 pointer-events-none"></div>
// </div>
// </section>
