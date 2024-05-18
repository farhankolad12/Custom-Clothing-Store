import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link
        shallow={true}
        style={{
          backgroundColor: "transparent",
        }}
        href="/"
        className="text-5xl"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          title="Logo"
          className="lg:w-36 lg:h-28 w-32 h-22"
          style={{ mixBlendMode: "multiply", objectFit: "cover" }}
          width={0}
          height={0}
        />
      </Link>
    </div>
  );
}
