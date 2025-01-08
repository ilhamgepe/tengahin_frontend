import { GalleryVerticalEnd } from "lucide-react";
import { PropsWithChildren, Suspense } from "react";
import BurgerButton from "./partials/BurgerButton";
import NavbarUser from "./partials/NavbarUser";
import SearchNavbar from "./partials/SearchNavbar";
import { GetSession } from "@/actions/session";

export default async function Navbar({ children }: PropsWithChildren) {
  const session = await GetSession();
  // console.log("SESSION IN NAVBAR", session);

  return (
    <div>
      <div className="w-full sticky top-0 backdrop-blur-md border-b-[1px] shadow-md">
        <div className="flex items-center justify-between gap-5 p-3">
          {/* left */}
          <div>
            <div className="block sm:hidden">
              <BurgerButton />
            </div>
            <div className="hidden sm:flex items-center text-primary font-bold gap-1">
              <GalleryVerticalEnd className="size-5" />
              <p className="text-xl">Tengahin</p>
            </div>
          </div>

          {/* center */}
          <div className="flex flex-1 items-center gap-5">
            <SearchNavbar />
          </div>

          {/* right */}
          <div className="flex items-center gap-5">
            <NavbarUser />
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-red-200">{children}</div>
    </div>
  );
}
