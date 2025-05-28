import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  //to get the input we have to create state variables

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  //now we have to create change handler to receive the event
  //rather than using two change handlers for login and signup,
  //  we can use a single change handler

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }

  };

//now we have to write a function to handle the form submission
//we will get all the data from the state variables
//  and send it to the backend later


const handleRegistration = (type)=>{
  //ternary operator to get the input data based on the type
  const inputData = type === "signup" ? signupInput : loginInput;
  console.log(inputData);
  // we can use the inputData to send it to your backend API
  // console.log(type === "signup" ? signupInput : loginInput);
  // Here we will add your API call logic to send the data to the backend
  //  later
}



  return (
    <div className="flex items-center justify-center h-screen bg-zinc-700">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>Create a New Account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="name"
                  value={signupInput.name}
                  type="text"
                  placeholder="Eg. Aryan Talekar"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                 onChange={(e) => changeInputHandler(e, "signup")}
                  name="email"
                  value={signupInput.email}
                  type="email"
                  placeholder="Eg. aryantalekar@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="password"
                  value={signupInput.password}
                  type="password"
                  placeholder="Eg .aryan@T123"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={()=> handleRegistration("signup")}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your Account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="email"
                  value={loginInput.email}
                  type="email"
                  placeholder="Eg. aryantalekar@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="password"
                  placeholder="Eg .aryan@T123"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
                <Button onClick={()=> handleRegistration("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
