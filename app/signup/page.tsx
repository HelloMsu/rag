"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function SignupPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-lg border p-6 shadow-sm bg-card text-center">
        <h1 className="text-3xl font-semibold mb-4">계정 만들기</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium leading-none">이메일</label>
            <input
              id="email"
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="name@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-sm font-medium leading-none">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow h-9 px-4 py-2 w-full"
          >
            회원가입
          </button>
          <button
            type="button"
            onClick={() => router.push("/signup?provider=google")}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent shadow h-9 px-4 py-2 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4" aria-hidden>
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.591 31.668 29.172 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C33.64 5.079 29.062 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C33.64 5.079 29.062 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 43c5.089 0 9.61-1.949 13.086-5.114l-6.046-5.1C29.966 34.186 27.155 35 24 35c-5.147 0-9.577-3.352-11.287-8.018l-6.49 5.005C9.54 38.556 16.227 43 24 43z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.063 3.131-3.41 5.681-6.317 7.103.002-.001.003-.001.005-.002l6.046 5.1C33.87 41.195 38.5 43 44 43c11.045 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z" visibility="hidden"/>
            </svg>
            Google로 계속하기
          </button>
          <p className="text-xs text-muted-foreground text-center">
            이미 계정이 있나요? <Link href="/" className="underline hover:no-underline">로그인</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
