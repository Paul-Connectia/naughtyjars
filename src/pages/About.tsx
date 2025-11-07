import Subscribe from "@/components/about/Subscribe";
import Team from "@/components/about/Team";
import StatsCircles from "@/components/StatsCircles";
import Image from "@/components/ui/Image";
import Head from "@/layout/Head";
import MaxContainer from "@/layout/MaxContainer";

export default function About() {
  return (
    <>
      <Head title="About Us | Naughty Jars - Desserts & Beyond" />
      <video
        src="https://res.cloudinary.com/dxzjwpf46/video/upload/v1761581609/NJ_Reel_03_yspo8s.mp4"
        className="h-full w-full object-cover sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px]"
        autoPlay
        muted
      ></video>

      <MaxContainer className="px-5 py-12 sm:px-8 md:px-10">
        <h2 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
          About Us
        </h2>
        <p className="text-gray ml-4 text-justify text-base leading-relaxed sm:text-lg">
          At Naughty Jars, our mission is to turn every jar into a small work of
          art layered with flavor, passion, and precision. Inspired by Italian
          traditions and reimagined for Dubai’s dessert lovers, we craft
          tiramisu in a cloud kitchen that guarantees freshness, consistency,
          and care in every batch.
          <br />
          Using premium ingredients and creative combinations, we bring you
          unique flavors like Date and Qahwa, Lotus Biscoff, Ferrero Rocher and
          Pistachio, all handcrafted with love. Each jar reflects our commitment
          to quality and indulgence, made for those who appreciate the finer
          things in life.
        </p>

        <div className="relative mx-auto mt-10">
          <div className="mx-auto grid max-w-4xl grid-cols-4 sm:h-[350px]">
            <Image src="/about/1.avif" />
            <p className="absolute top-3 left-10 bg-[#f1dab0] p-1 text-center sm:left-60 sm:w-40 sm:p-3">
              Pure indulgence
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
              Nothing less than perfection in every jar
            </p>
            <Image src="/about/4.avif" />
            <Image src="/about/5.avif" className="-z-10" />
            <div className="relative">
              <Image src="/about/6.avif" className="-z-10 -mt-10" />
              <div className="absolute bottom-2 left-5 -ml-20 w-40 bg-[#d2b58d] p-1 text-xs sm:ml-0 sm:p-5">
                Flavors built to impress
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
          Loved by customers and crafted by skilled staff, every jar reflects our passion for quality and flavor. From the first layer to the last bite, we make sure every dessert experience is nothing short of exceptional.
          </p>
          {/* <MaxContainer className="my-10 flex max-w-2xl flex-col items-center justify-center text-center sm:flex-row sm:justify-between">
            {[
              {
                value: "87%",
                label: "Satisfied Customers",
                animation: "animate-bounce",
              },
              {
                value: "93%",
                label: "Organic Customers",
                animation: "animate-pulse",
              },
              {
                value: "83%",
                label: "Skilled Staff",
                animation: "animate-bounce",
              },
            ].map((item, idx) => (
              <div key={idx} className="mb-4">
                <div
                  className={`border-purple text-purple flex flex-col items-center justify-center rounded-full border ${idx !== 1
                    ? "h-[150px] w-[150px] text-xl"
                    : "h-[180px] w-[180px] text-xl"
                    }`}
                >
                  <span
                    className={`${idx !== 1 ? "text-3xl" : "text-4xl"} ${item.animation} `}
                  >
                    {item.value}
                  </span>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </MaxContainer> */}
          <div className="py-4">
            <StatsCircles />
          </div>
        </MaxContainer>

        <Team />

        <MaxContainer className="py-10">
          <Subscribe />
        </MaxContainer>
      </section>
    </>
  );
}
