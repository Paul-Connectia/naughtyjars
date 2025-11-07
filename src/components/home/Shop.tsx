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
      <p className="text-gray ml-3 max-w-5xl text-justify text-base leading-relaxed sm:ml-5 md:text-lg">
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
