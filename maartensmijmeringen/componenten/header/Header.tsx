import { FC } from "react";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <header>
      <Image
        src="/mm_header3vlekken.jpg"
        alt="Maartens mijmeringen"
        width={764}
        height={163}
      />
    </header>
  );
};
