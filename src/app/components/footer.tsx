import Link from "next/link";
export default function Footer() {
  return (
    <footer className=" bg-white text-gray-500 pl-6 pr-6 bottom-0 text-[12px] py-4 ">
      <div className="flex flex-row justify-between">
        <p>&copy; {new Date().getFullYear()} ALLSet</p>
        <div className="flex space-x-6">
          <Link
            href="https://manas-charchi-developer.vercel.app/"
            className="hover:underline hover:underline-offset-4"
          >
            Me
          </Link>
          <Link
            href="https://github.com/MANAS-CHARCHI"
            className="hover:underline hover:underline-offset-4"
          >
            Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/manascharchi02/"
            className="hover:underline hover:underline-offset-4"
          >
            Linkedin
          </Link>
        </div>
      </div>
    </footer>
  );
}
