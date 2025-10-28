

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
      <video
        src="https://res.cloudinary.com/dxzjwpf46/video/upload/v1761583289/NJ_Reel_06_iqyw9q.mp4"
        className="h-full w-full object-cover sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px]"
        autoPlay
        muted
      ></video>
    </div>
  );
}
