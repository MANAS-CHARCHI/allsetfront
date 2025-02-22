import Image from "next/image";
import Link from "next/link";

export default function LockHeader() {
  return (
    <header className="bg-white text-black p-4 ">
      <nav className="flex lg:px-4  w-full">
        <Image src="/logo.png" alt="Logo" width={120} height={60} />
        <div className="ml-auto">
          <Link href="/registration" className="text-lg">
            <button className="px-4 py-0.5 border border-gray-300 rounded-3xl  hover:bg-gray-100">
              Sign in
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
