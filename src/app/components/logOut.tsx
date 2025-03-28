import { logout_user } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
