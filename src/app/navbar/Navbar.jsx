import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Bird } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex w-full p-4 border-b justify-between items-center flex-wrap gap-4 md:gap-6">
        {/* Left Logo */}
        <NavigationMenuItem className="w-auto">
          <Link
            to="/home"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Bird className="size-4" />
            </div>
            Auth-Bird
          </Link>
        </NavigationMenuItem>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-15 items-center justify-center md:justify-between w-full md:w-auto">
          <NavigationMenuItem>Home</NavigationMenuItem>
          <NavigationMenuItem>About Us</NavigationMenuItem>
          <NavigationMenuItem>Career</NavigationMenuItem>
          <NavigationMenuItem>Contact Us</NavigationMenuItem>
          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
