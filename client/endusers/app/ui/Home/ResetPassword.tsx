import React from "react";

export default function ResetPassword() {
  return (
    <>
      <div className="flex flex-col gap-5 mt-3">
        <span className="text-black">
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </span>
        <input
          type="email"
          id="email"
          placeholder="EMAIL*"
          className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
        />
      </div>
      <button className="bg-transparent w-full border border-black hover:bg-black hover:text-white cursor-pointer uppercase font-bold py-3 my-10">
        reset password
      </button>
    </>
  );
}
