import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white text-black p-4 ">
      <nav className="flex lg:px-4  w-full">
        <Image src="/logo.png" alt="Logo" width={120} height={60} />
        <button className="px-4 py-0.5 border border-gray-300 rounded-3xl ml-auto hover:bg-gray-100">
          <div className="text-lg">Sign in</div>
        </button>
      </nav>
    </header>
  );
}
