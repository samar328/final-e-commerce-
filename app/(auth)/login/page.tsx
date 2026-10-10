"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  Truck,
  ShieldCheck,
  Headphones,
  LockKeyhole,
  Users,
  Star,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { loginSchema } from "@/app/schema/loginSchema";

export type loginData = zod.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<loginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // =========================
  // Credentials Login
  // =========================
  async function submitForm(data: loginData) {
    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.add({
          type: "success",
          description: "Login successful",
        });

        router.push("/");
        router.refresh();
      } else {
        toast.add({
          type: "error",
          description:
            result?.error || "Email or password is incorrect",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);

      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // =========================
  // Google Login
  // =========================
  async function handleGoogleLogin() {
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }



  return (
    <main className="min-h-[calc(100vh-160px)] bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] lg:grid-cols-2">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <div className="hidden min-h162ز5 flex-col justify-center bg-[#f0fff5] p-8 lg:flex xl:p-12">

            <div className="mx-auto w-full max-w-130">

              {/* Image */}
              <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-82.5 w-full">
                  <Image
                    src="/Login.png"
                    alt="FreshCart shopping"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-center text-3xl font-bold leading-tight text-[#172033] xl:text-[32px]">
                FreshCart - Your One-Stop Shop
                <br />
                for Fresh Products
              </h2>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-125 text-center text-base leading-7 text-[#42526b]">
                Join thousands of happy customers who trust FreshCart
                for their daily grocery needs
              </p>

              {/* Features */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">

                {/* Free Delivery */}
                <div className="flex items-center gap-2 text-sm text-[#42526b]">
                  <span className="flex h-6 w-6 items-center justify-center text-[#16a34a]">
                    <Truck size={18} strokeWidth={2} />
                  </span>

                  Free Delivery
                </div>

                {/* Secure Payment */}
                <div className="flex items-center gap-2 text-sm text-[#42526b]">
                  <span className="flex h-6 w-6 items-center justify-center text-[#16a34a]">
                    <ShieldCheck size={18} strokeWidth={2} />
                  </span>

                  Secure Payment
                </div>

                {/* 24/7 Support */}
                <div className="flex items-center gap-2 text-sm text-[#42526b]">
                  <span className="flex h-6 w-6 items-center justify-center text-[#16a34a]">
                    <Headphones size={18} strokeWidth={2} />
                  </span>

                  24/7 Support
                </div>

              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <div className="flex min-h-162.5 items-center justify-center p-6 sm:p-10 lg:p-12">

            <div className="w-full max-w-125">

              {/* Logo */}
              <div className="mb-5 flex justify-center">
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-[#16a34a]">
                    Fresh
                  </span>

                  <span className="text-3xl font-extrabold tracking-tight text-[#172033]">
                    Cart
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-center text-3xl font-bold text-[#172033]">
                Welcome Back!
              </h1>

              <p className="mt-3 text-center text-[15px] text-[#53627a]">
                Sign in to continue your fresh shopping experience
              </p>

              {/* =================================================
                  SOCIAL LOGIN
              ================================================== */}
              <div className="mt-7 space-y-3">

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-[#dfe3e8] bg-white text-[16px] font-medium text-[#172033] transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                >
                  <span className="text-xl font-bold text-[#4285F4]">
                    G
                  </span>

                  <span>Continue with Google</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-[#dfe3e8] bg-white text-[16px] font-medium text-[#172033] transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-sm font-bold text-white">
                    f
                  </span>

                  <span>Continue with Facebook</span>
                </button>

              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e5e7eb]" />

                <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                  Or continue with email
                </span>

                <div className="h-px flex-1 bg-[#e5e7eb]" />
              </div>

              {/* =================================================
                  FORM
              ================================================== */}
              <form onSubmit={handleSubmit(submitForm)}>

                <div className="space-y-5">

                  {/* Email */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <FieldLabel
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-semibold text-[#172033]"
                        >
                          Email Address
                        </FieldLabel>

                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your email"
                          autoComplete="email"
                          className="h-13.5 rounded-xl border-[#dfe3e8] px-4 text-[15px] shadow-none focus:border-[#16a34a] focus:ring-[#16a34a]"
                        />

                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="mt-1"
                          />
                        )}

                      </Field>
                    )}
                  />

                  {/* Password */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>

                        <div className="mb-2 flex items-center justify-between">

                          <FieldLabel
                            htmlFor={field.name}
                            className="text-sm font-semibold text-[#172033]"
                          >
                            Password
                          </FieldLabel>

                          <button
                            type="button"
                            className="text-sm font-medium text-[#16a34a] transition hover:text-[#15803d]"
                            onClick={() =>
                              router.push("/forgot-password")
                            }
                          >
                            Forgot Password?
                          </button>

                        </div>

                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          className="h-13.5 rounded-xl border-[#dfe3e8] px-4 text-[15px] shadow-none focus:border-[#16a34a] focus:ring-[#16a34a]"
                        />

                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="mt-1"
                          />
                        )}

                      </Field>
                    )}
                  />

                </div>

                {/* Keep signed in */}
                <div className="mt-5 flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-[#16a34a]"
                  />

                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-sm text-[#42526b]"
                  >
                    Keep me signed in
                  </label>

                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 h-13.5 w-full rounded-xl bg-[#16a34a] text-[16px] font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#15803d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

              </form>

              {/* =================================================
                  REGISTER
              ================================================== */}
              <div className="my-7 border-t border-[#eeeeee]" />

              <p className="text-center text-[15px] text-[#42526b]">
                New to FreshCart?{" "}

                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="font-semibold text-[#16a34a] hover:text-[#15803d]"
                >
                  Create an account
                </button>
              </p>

              {/* Bottom info */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#697586]">

                {/* SSL */}
                <span className="flex items-center gap-1.5">
                  <LockKeyhole size={14} strokeWidth={2} />
                  SSL Secured
                </span>

                {/* Users */}
                <span className="flex items-center gap-1.5">
                  <Users size={14} strokeWidth={2} />
                  50K+ Users
                </span>

                {/* Rating */}
                <span className="flex items-center gap-1.5">
                  <Star size={14} strokeWidth={2} />
                  4.9 Rating
                </span>

              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}


