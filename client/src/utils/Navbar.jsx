import { Menu, School } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/ModeToggle";

const Navbar = () => {
  const user = true;

  return (
    <div className=" h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="flex max-w-7xl mx-auto hidden md:flex justify-between items-center gap-4 h-full">
        <div>
          <h1 className="ml-4 hidden md:block font-extrabold text-4xl font-[Modern_Antiqua]">
            Think<span className="text-purple-500">Stack</span>
          </h1>
        </div>

        {/* user icon and theme-toggle icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </div>
      {/* Mobile Device */}

      <div className="flex md:hidden items-center justify-center px-4 h-full ">
        <h1 className="font-extrabold text-4xl tracking-tight leading-tight text-white font-[Modern_Antiqua]">
          Think<span className="text-purple-500">Stack</span>
        </h1>

        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="rounded-full bg-gray-200 hover:bg-gray-200"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2 mr-12">
            <SheetTitle>ThinkStack</SheetTitle>
            <ModeToggle />
          </SheetHeader>
          <nav className="flex flex-col space-y-4 justify-center items-center mt-10">
            <span>My learning</span>
            <span>Edit Profile</span>
            <span>Log Out</span>
          </nav>
          {role === "instructor" && (
            <SheetFooter>
              <Button type="submit">DashBoard</Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
