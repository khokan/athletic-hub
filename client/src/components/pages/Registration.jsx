import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { reload, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";

const Registration = () => {
  const { createUser, signInGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [result, setResult] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const formData = new FormData(form);
    const { email, password, ...restData } = Object.fromEntries(
      formData.entries()
    );

    setError("");
    setResult(false);

    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegEx.test(password) === false) {
      setError(
        "Must have atleast 6 characters, one lowercase letter and one uppercase letter"
      );
      return;
    }
    try {
      const result = await createUser(email, password);
      if (auth.currentUser) {
        await updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        setResult(true);
        await reload(auth.currentUser); // ✅ reload updated user data
        navigate(location?.state || "/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInGoogle = () => {
    signInGoogle()
      .then((result) => {
        setResult(true);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (result) {
      toast.success("Successfully Registerd");
    }
  }, [error, result]);

  return (
    <>
      <Helmet>
        <title>Registration | HobbyHub</title>
      </Helmet>
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Registration Page</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="photo">Photo URL</Label>
                  <Input
                    id="photo"
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={visible ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4">
                  Registration
                </Button>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}

                <p className="text-center text-sm">
                  Already Have An Account?{" "}
                  <Link to="/login" className="text-primary underline">
                    Login
                  </Link>
                </p>

                <Button
                  onClick={handleSignInGoogle}
                  variant="outline"
                  className="w-full"
                >
                  <FaGoogle className="mr-2" />
                  Google Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Registration;
