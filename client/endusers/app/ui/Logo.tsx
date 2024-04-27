import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="text-5xl">
        <Image
          unoptimized
          src="/logo.png"
          alt="Logo"
          className="w-28 h-7"
          width={0}
          height={0}
        />
      </Link>
    </div>
  );
}
