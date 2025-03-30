"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { update_user, get_user } from "@/app/utils/auth";
import InputBox from "../props/input-box";
import { useEffect } from "react";
export function EditProfile() {
  const [invalidError, setInvalidError] = useState<{ [key: string]: string }>(
    {}
  );
  interface State {
    firstName: string;
    lastName: string;
    DOB: string;
    phoneNumber: string;
  }
  const [formData, setFormData] = useState<State>({
    firstName: "",
    lastName: "",
    DOB: "",
    phoneNumber: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await get_user(); // Assume this fetches the logged-in user
        if (user.success) {
          setFormData({
            firstName: user.data.first_name || "",
            lastName: user.data.last_name || "",
            DOB: user.data.DOB || "",
            phoneNumber: user.data.phone_number || "",
          });
        } else {
          toast.error(user.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  const validateInput = () => {
    const newErrors: { [key: string]: string } = {};
    if (
      formData.firstName.trim() !== "" &&
      !/^[a-zA-Z\s]+$/.test(formData.firstName)
    ) {
      newErrors.firstName = "Can't contain numbers, dots, or commas.";
    }
    if (
      formData.lastName.trim() !== "" &&
      !/^[a-zA-Z\s]+$/.test(formData.lastName)
    ) {
      newErrors.lastName = "Can't contain numbers, dots, or commas.";
    }
    if (
      formData.DOB.trim() !== "" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.DOB)
    ) {
      newErrors.DOB = "Must be in YYYY-MM-DD format.";
    } else {
      // Check if the date is valid
      const dobDate = new Date(formData.DOB);
      const today = new Date();
      if (dobDate > today) {
        newErrors.DOB = "Can't be in the future.";
      }
    }
    if (formData.phoneNumber.trim() !== "") {
      if (
        formData.phoneNumber.length < 10 ||
        formData.phoneNumber.length > 15
      ) {
        newErrors.phoneNumber = "Can't have a valid length.";
      }
      if (!/^[\d+ ]+$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Invalid phone number format.";
      }
      if ((formData.phoneNumber.match(/\+/g) || []).length > 1) {
        newErrors.phoneNumber = "Can only have one '+' at the beginning.";
      }
      if (
        formData.phoneNumber.includes("+") &&
        formData.phoneNumber[0] !== "+"
      ) {
        newErrors.phoneNumber = "The '+' sign can only be at the beginning.";
      }
    }
    setInvalidError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      DOB: formData.DOB,
      phoneNumber: formData.phoneNumber,
    };
    try {
      console.log("Submitting payload:", payload); // Debugging log
      const user = await update_user(
        payload.firstName,
        payload.lastName,
        payload.DOB,
        payload.phoneNumber
      );
      console.log("Response from update_user:", user.data); // Debugging log
      if (user.success) {
        toast("Profile updated successfully!");
      } else {
        toast("Update failed: No user returned");
      }
    } catch (e) {
      console.error("Error in update_user:", e);
      toast("Update failed! Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Edit Profile</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col gap-4 items-center justify-center">
            {/* First Name */}
            <div className="flex flex-row w-full">
              <Label
                htmlFor="firstName"
                className="text-left w-52 content-center"
              >
                First Name
              </Label>
              <div className="flex flex-col w-full">
                <InputBox
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-10 w-full"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                  placeholder="First Name"
                  error={invalidError.firstName}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-row w-full">
              <Label
                htmlFor="lastName"
                className="text-left w-52 content-center"
              >
                Last Name
              </Label>
              <div className="flex flex-col w-full">
                <InputBox
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-10 w-full"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                  placeholder="Last Name"
                  error={invalidError.lastName}
                />
              </div>
            </div>

            {/* DOB */}
            <div className="flex flex-row w-full">
              <Label htmlFor="DOB" className="text-left w-52 content-center">
                DOB
              </Label>
              <div className="flex flex-col w-full">
                <InputBox
                  type="text"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  className="h-10 w-full"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                  placeholder="YYYY-MM-DD"
                  error={invalidError.DOB}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-row w-full">
              <Label
                htmlFor="phoneNumber"
                className="text-left w-52 content-center"
              >
                Phone Number
              </Label>
              <div className="flex flex-col w-full">
                <InputBox
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-10 w-full"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                  placeholder="Phone Number"
                  error={invalidError.phoneNumber}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="mt-5">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
