import MaxContainer from "@/layout/MaxContainer";

const dummyImages = ["/nhs.png", "/nhss.png", "/sjhd.png"];

export default function Shop() {
  return (
    <MaxContainer className="px-5 py-10 sm:px-8 md:px-10">
      <h4 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
        Shop Online
      </h4>
      <p className="text-gray ml-3 max-w-5xl text-justify text-base leading-relaxed sm:ml-5 md:text-lg">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8 md:grid-cols-3 md:gap-10">
        {dummyImages.map((img, index) => (
          <div className="w-full text-center" key={index}>
            <div
              className="mb-3 w-full"
              style={{
                paddingBottom: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="hover:scale-[1.15] absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 ease-in-out"
              />
            </div>
            <button className="bg-yellow rounded-3xl px-5 py-1.5 text-lg text-white sm:px-8 cursor-pointer hover:bg-yellow-800/75 transition-colors duration-300">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </MaxContainer>
  );
}
