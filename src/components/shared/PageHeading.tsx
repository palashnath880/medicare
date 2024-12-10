import React from "react";

const PageHeading = ({
  name,
  bgImg,
}: {
  name: React.ReactNode;
  bgImg: string;
}) => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(#00000075, #00000075), url(${bgImg})`,
      }}
    >
      <div className="container mx-auto aspect-[16/3.5] grid place-items-center">
        <h1 className="text-center text-5xl font-semibold text-white">
          {name}
        </h1>
      </div>
    </section>
  );
};

export default PageHeading;
