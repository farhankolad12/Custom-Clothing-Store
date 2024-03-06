import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="text-5xl">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </Link>
    </div>
  );
}
