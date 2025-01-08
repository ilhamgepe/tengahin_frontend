import { GetSession } from "@/actions/session";
import LogoutButton from "@/components/buttons/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu-edited";
import { Separator } from "@/components/ui/separator";
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";

const NavbarUser = async () => {
  const session = await GetSession();
  // console.log("SESSION IN NAVBAR USER", session);

  return (
    <div>
      {session ? (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="flex items-center gap-1 max-w-[150]">
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {getInitials("ilham gilang pamungkas")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate hidden sm:inline-block">
                    {session?.user.fullname}
                  </span>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col w-56">
                  <div className="p-2">
                    <span className="font-medium">My Account</span>
                  </div>
                  <Separator orientation="horizontal" className="bg-muted" />
                  <Link
                    href="/profile"
                    className="p-2 hover:bg-muted font-medium text-sm"
                  >
                    Profile
                  </Link>
                  <Separator orientation="horizontal" className="bg-muted" />
                  <div className="p-2">
                    <LogoutButton />
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/register"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarUser;
