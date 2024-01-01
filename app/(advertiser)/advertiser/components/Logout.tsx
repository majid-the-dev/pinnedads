"use client";

import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

const Logout = () => {

  const router = useRouter()

  function logOut(){
    signOut()
    router.push(`/advertiser-login`)
  }

  const handleSignOut = async () => {
    signOut();
    // Redirect to sign-in page
    router.push('/advertiser-login');
  };

  return (
    <div
      onClick={handleSignOut}
      className="pl-14 w-full py-4 flex items-center gap-3 cursor-pointer"
    >
      <h1>LOGOUT</h1>
      <IoIosLogOut />
    </div>
  );
};

export default Logout;
