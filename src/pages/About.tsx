import Subscribe from "@/components/about/Subscribe";
import Team from "@/components/about/Team";
import Image from "@/components/ui/Image";
import Head from "@/layout/Head";
import MaxContainer from "@/layout/MaxContainer";

export default function About() {
  return (
    <>
      <Head title="About Us | Naughty Jars - Desserts & Beyond" />
      <Image
        src="/naughty.png"
        alt="Banner Hero"
        className="h-[550px] w-full object-cover sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px]"
      />

      <MaxContainer className="px-5 py-12 sm:px-8 md:px-10">
        <h2 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
          about us
        </h2>
        <p className="text-gray ml-4 text-justify text-base leading-relaxed sm:text-lg">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie.
        </p>

        <div className="relative mx-auto mt-10">
          <div className="mx-auto grid max-w-4xl grid-cols-4 sm:h-[350px]">
            <Image src="/about/1.avif" />
            <p className="absolute top-3 left-10 bg-[#f1dab0] p-1 text-center sm:left-60 sm:w-40 sm:p-3">
              Lorem ipsum
            </p>
            <Image src="/about/2.avif" className="mt-5" />
            <div className="-z-20 -mt-5 h-[200px] bg-[#EDEAAAff] sm:h-[350px] sm:p-5">
              <Image src="/about/3.avif" className="h-full" />
            </div>
            <div className="-ml-10 flex h-fit flex-col bg-[#d2b58d] p-3 text-center text-xs sm:mt-40 sm:-ml-5 sm:h-40 sm:p-8 sm:text-xl">
              <span>Our High</span>
              <span>Quality</span>
              <span>Production</span>
              <span>Process</span>
            </div>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-4 sm:h-[350px]">
            <p className="-mt-10 flex flex-col bg-[#f1dab0] p-1 text-center text-xs sm:h-full sm:w-52 sm:p-5 sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ad
              labore
            </p>
            <Image src="/about/4.avif" />
            <Image src="/about/5.avif" className="-z-10" />
            <div className="relative">
              <Image src="/about/6.avif" className="-z-10 -mt-10" />
              <div className="absolute bottom-2 left-5 -ml-20 w-40 bg-[#d2b58d] p-1 text-xs sm:ml-0 sm:p-5">
                Lorem, ipsum dolor sit amet
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-4xl">
          Using the best ingredients for every product and ensuring the best
          quality in every bite. Before being served, products go through strict
          inspection to ensure quality standards. Every step in production is
          carefully monitored to achieve the perfect texture and taste.
        </p>
      </MaxContainer>

      <section className="rounded-t-4xl bg-[#f1dab0] px-5 py-10 sm:px-8 md:px-10">
        <MaxContainer>
          <h4 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
            Why Choose Us
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie.
          </p>
          <MaxContainer className="my-10 flex max-w-2xl flex-col items-center justify-center text-center sm:flex-row sm:justify-between">
            {[
              { value: "87%", label: "Satisfied Customers" },
              { value: "93%", label: "Organic Customers" },
              { value: "83%", label: "Skilled Staff" },
            ].map((item, idx) => (
              <div key={idx} className="mb-4">
                <div
                  className={`hover-scale border-purple text-purple flex flex-col items-center justify-center rounded-full border ${
                    idx !== 1 ? "size-[150px] text-xl" : "size-[180px] text-xl"
                  }`}
                >
                  <span className={idx !== 1 ? "text-3xl" : "text-4xl"}>
                    {item.value}
                  </span>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </MaxContainer>
        </MaxContainer>

        <Team />

        <MaxContainer className="py-10">
          <Subscribe />
        </MaxContainer>
      </section>
    </>
  );
}
