import { logout_user } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut as LogOutIcon } from "lucide-react";
export default function LogOut() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout_user();
      localStorage.removeItem("user");
      toast("Loged Out Successfully!");
      router.push("/login");
    } catch (e) {
      toast("Something is wrong while logging out!");
    }
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="w-full text-left flex flex-row gap-1 cursor-pointer  hover:text-red-600"
      >
        <LogOutIcon className="w-4 pb-1" />
        Log out
      </button>
    </>
  );
}
