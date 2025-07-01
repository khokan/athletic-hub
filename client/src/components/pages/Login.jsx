import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

const Login = () => {
  const { signInUser, signInGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const [result, setResult] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    setResult(false);
    signInUser(email, password)
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignInGoogle = () => {
    setError("");
    setResult(false);
    signInGoogle()
      .then((result) => {
        setResult(true);

        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value;
    navigate("/forgot-password", { state: { email } });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (result) {
      toast.success("Logged In Successfully");
    }
  }, [error, result]);

  return (
    <>
      <>
        <Helmet>
          <title>Login | AthleticHub</title>
        </Helmet>
        <div className="flex justify-center items-center mt-2">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center">Login Page</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      ref={emailRef}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don't Have An Account?{" "}
                <Link to="/registration" className="underline">
                  Registration
                </Link>
              </div>
              <div className="mt-2 text-center text-sm">
                <button
                  type="button"
                  onClick={handleForgetPass}
                  className="underline text-muted-foreground"
                >
                  Forgot password?
                </button>
              </div>
              <Button
                onClick={handleSignInGoogle}
                variant="outline"
                className="w-full mt-4"
              >
                <FaGoogle className="mr-2" />
                Google Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    </>
  );
};

export default Login;
