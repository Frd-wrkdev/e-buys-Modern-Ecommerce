'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function AccountDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-[920px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Akun Saya</h1>
            <Button
              onClick={() => {
                logout()
                router.push('/')
              }}
              variant="outline"
            >
              Keluar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <UserCircleIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">Profil</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Nama</p>
                      <p className="font-medium">{user?.name || 'Belum diatur'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Edit Profil
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <ShoppingBagIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">Riwayat Pesanan</h2>
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      Anda belum memiliki pesanan.
                    </p>
                    <Button 
                      onClick={() => router.push('/')}
                    >
                      Mulai Belanja
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Butuh Bantuan?</h2>
              <p className="mb-6">
                Tim layanan pelanggan kami siap membantu Anda 24/7.
              </p>
              <Button 
                variant="secondary"
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
