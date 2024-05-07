import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link
        style={{
          backgroundColor: "transparent",
        }}
        href="/"
        className="text-5xl"
      >
        <Image
          unoptimized
          src="/logo.png"
          alt="Logo"
          title="Logo"
          className="lg:w-28 lg:h-20 w-24 h-24"
          style={{ mixBlendMode: "multiply" }}
          width={0}
          height={0}
        />
      </Link>
    </div>
  );
}
