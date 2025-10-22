import Image from "../ui/Image";

export default function BehindScene() {
  return (
    <div className="px-5 py-10 sm:px-8 md:px-10">
      <h4 className="text-gray mb-6 text-3xl md:text-4xl lg:text-5xl">
        Behind the Scenes
      </h4>
      <p className="text-gray max-w-5xl pl-3 text-left text-base leading-relaxed sm:pl-5 md:text-lg">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie.
      </p>
      <Image
        src="/video.png"
        alt="Behind the Scenes"
        className="mt-10 w-full rounded-xl object-cover"
      />
    </div>
  );
}
