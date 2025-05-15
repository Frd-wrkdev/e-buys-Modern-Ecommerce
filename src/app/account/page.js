'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import useAuthStore from '@/store/authStore'

export default function AccountPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      id: 1,
      name: formData.name || 'Demo User',
      email: formData.email,
    })
    router.push('/account/dashboard')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="py-4 border-b">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-buys
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-[440px] mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                {isLogin ? 'Selamat Datang!' : 'Buat Akun'}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? 'Masuk ke akun Anda untuk melanjutkan'
                  : 'Daftar untuk mulai berbelanja'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nama
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    className="w-full"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  {isLogin && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                          Lupa password?
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <div className="p-6">
                          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                          <p className="text-sm text-gray-600 mb-4">
                            Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
                          </p>
                          <Input
                            type="email"
                            placeholder="Masukkan email Anda"
                            className="w-full mb-4"
                          />
                          <Button className="w-full" variant="default">
                            Kirim Link Reset
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda"
                  className="w-full"
                  required
                />
              </div>

              <Button type="submit" className="w-full" variant="default">
                {isLogin ? 'Masuk' : 'Daftar'}
              </Button>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {isLogin
                    ? "Belum punya akun? Daftar"
                    : 'Sudah punya akun? Masuk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
