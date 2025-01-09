"use client"

import { useForm } from "react-hook-form"
import { Eye, EyeOff } from 'lucide-react'
import { useState } from "react"
import { Link } from "react-router-dom"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 rounded-2xl py-32 bg-[#6366F1]">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-medium text-white ">Login to Account</h1>
            <p className="text-sm text-white/90">
              Please enter your email and password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-medium text-white/90">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="user@email.com"
                className="w-full px-3 py-3 rounded-lg bg-white text-gray-900 text-base focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-white/90">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3 py-3 rounded-lg bg-white text-gray-900 text-base focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20}/>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                {...register("rememberPassword")}
                type="checkbox"
                id="remember"
                className="rounded-2xl  border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember Password
              </label>
            </div>

            <Link
              to="/dashboard/dashboardHome"
              type="submit"
              className="btn w-full border-none py-2.5 px-4 text-sm font-medium text-white bg-[#343689] rounded-full hover:bg-[#2f3080] transition-colors"
            >
              LOG IN
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

