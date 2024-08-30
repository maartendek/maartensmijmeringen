import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: FC = () => {
    return (
        <header>
            <Link href="/">
                <Image
                    src="/mm_header3vlekken.jpg"
                    alt="Maartens mijmeringen"
                    width={764}
                    height={163}
                />
            </Link>
        </header>
    );
};
