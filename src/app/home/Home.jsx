import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KoiFish from "../Animation/KoiFish";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/store";
import LoadingSpinner from "../loader/LoadingSpinner";

const HomePage = () => {
  const [quote, setQuote] = useState("");
  const { authUser, isCheckingAuth, logout } = useAuthStore();

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/quotes/quote/random"
      );
      const data = await res.json();
      setQuote(data.data.content);
    };
    getQuote();
  }, []);

  if (isCheckingAuth)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <LoadingSpinner />
      </div>
    );

  console.log(authUser);

  const logoutUser = async function () {
    await logout();
  };
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-sky-200 dark:bg-[#001f3f]">
      <div className="absolute inset-0 z-0">
        <KoiFish />
      </div>

      {/* Centered Card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 opacity-80">
        <Card className="w-full max-w-md backdrop-blur-md shadow-xl rounded-xl p-4">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {authUser && !isCheckingAuth
                ? `Hi ${authUser.username} quote of the day is`
                : "Want to see the quote for today?"}
            </CardTitle>
          </CardHeader>
          {authUser && !isCheckingAuth ? (
            <CardContent className="flex flex-col gap-4 justify-center">
              <p className="text-center">{`"${quote}"`}</p>
              <Button variant="destructive" onClick={logoutUser}>
                Logout
              </Button>
            </CardContent>
          ) : (
            <CardContent className="flex gap-4 justify-center">
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button variant="outline">
                <Link to={"/signup"}>Signup</Link>
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
