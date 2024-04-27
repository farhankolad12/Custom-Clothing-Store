import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

export default function Authentication({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: Function;
}) {
  const [selectedAuth, setSelectedAuth] = useState("login");

  return (
    <>
      <Dialog
        placeholder="Authentication"
        open={open}
        handler={() => handleOpen()}
      >
        <DialogHeader
          className="border-b border-gray-400 "
          placeholder="Auth Header"
        >
          <div className="flex justify-between items-center w-full pt-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedAuth("login")}
              className="bg-transparent text-lg font-bold uppercase"
            >
              login
            </button>
            <button
              type="button"
              onClick={() => setSelectedAuth("register")}
              className="bg-transparent text-lg font-bold uppercase"
            >
              register
            </button>
            <button
              type="button"
              onClick={() => setSelectedAuth("reset")}
              className="bg-transparent text-lg font-bold uppercase"
            >
              reset password
            </button>
          </div>
        </DialogHeader>
        <DialogBody className="lg:px-16 px-5" placeholder="Auth Body">
          {selectedAuth === "login" ? (
            <Login setSelectedAuth={setSelectedAuth} />
          ) : selectedAuth === "register" ? (
            <Register />
          ) : selectedAuth === "reset" ? (
            <ResetPassword />
          ) : (
            ""
          )}
        </DialogBody>
      </Dialog>
      <button
        className="icon-people font-bold bg-transparent"
        onClick={() => handleOpen()}
      >
        <i className=" text-xl bi bi-person" />
      </button>
    </>
  );
}
