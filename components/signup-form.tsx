// "use client"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { FormEvent, useState } from "react"
// import { createClient } from "@/lib/supabase/client"
// import { useRouter } from "next/navigation"

// export function SignUpForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {

//   const router = useRouter()

//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const supabase = createClient();

//     try {
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/private`,
//           data: {
//           display_name: username
//         },
//         },
//       });
//       if (error) throw error;
//       router.push("/private");
//     } catch (error: unknown) {
//       console.log(error)
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Sign up</CardTitle>
//           <CardDescription>
//             Create an account via Email and Password
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
//             <span className="bg-card text-muted-foreground relative z-10 px-2">
//               Enter your details
//             </span>
//           </div>
//           <form onSubmit={handleSignUp} className="mt-4">
//             <div className="grid gap-6">
//               <div className="grid gap-6">
//                 <div className="grid gap-3">
//                   <Label htmlFor="email">Username</Label>
//                   <Input
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     id="username"
//                     type="test"
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-3">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     id="email"
//                     type="email"
//                     placeholder="example@example.com"
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-3">
//                   <div className="flex items-center">
//                     <Label htmlFor="password">Password</Label>
//                   </div>
//                   <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Create account
//                 </Button>
//               </div>
//               <div className="text-center text-sm">
//                 Already have an account?{" "}
//                 <a href="/login" className="underline underline-offset-4">
//                   Login
//                 </a>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState('')
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            display_name: displayName
          }
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="test"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
