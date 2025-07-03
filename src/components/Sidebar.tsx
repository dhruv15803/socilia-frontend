import { Link, useNavigate } from "react-router-dom";
import SearchUserSheet from "./SearchUserSheet";
import axios from "axios";
import { backendUrl } from "@/App";
import { useContext } from "react";
import { AppContext } from "@/Context/AppContext";
import { AppContextType } from "@/types";
import { Button } from "./ui/button";
import { CiLogout } from "react-icons/ci";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RxAvatar } from "react-icons/rx";
import NotificationsSheet from "./NotificationsSheet";
import MessagesSheet from "./MessagesSheet";
import { CiSquarePlus } from "react-icons/ci";

const Sidebar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(
    AppContext
  ) as AppContextType;
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(response);
      setLoggedInUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky bottom-0 md:left-0  p-4 bg-white  shadow-md border-t-2 rounded-lg z-50">
      {loggedInUser !== null ? (
        <div className="flex flex-row md:flex-col md:space-y-4 justify-between md:justify-start">
          <SearchUserSheet />
          <NotificationsSheet />
          <div
            onClick={() => navigate("/create")}
            className="flex items-center cursor-pointer gap-2"
          >
            <button className="text-3xl">
              <CiSquarePlus />
            </button>
            <span className="font-semibold hidden md:inline">Create Post</span>
          </div>
          <MessagesSheet />
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center w-fit gap-2 py-2 cursor-pointer rounded-lg"
          >
            {loggedInUser.user_image ? (
              <img
                className="rounded-full w-8 h-8"
                src={loggedInUser.user_image}
                alt=""
              />
            ) : (
              <>
                <button className="text-4xl">
                  <RxAvatar />
                </button>
              </>
            )}
            <span className="text-lg text-gray-600 font-semibold hidden md:inline">
              {loggedInUser.username}
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex items-center gap-2">
                <button className="text-3xl md:hidden">
                  <CiLogout />
                </button>
                <Button variant="outline" className="w-full hidden md:block">
                  Logout
                </Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={logoutUser}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="mt-auto">
          <Button onClick={() => navigate("/login")} className="w-full">
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
