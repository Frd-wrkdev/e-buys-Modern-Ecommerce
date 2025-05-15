import Link from 'next/link'
import CartDrawer from './CartDrawer'
import useAuthStore from '@/store/authStore'
import { UserIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 flex items-center"
          >
            E-buys
          </Link>

          {/* Center navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Kategori
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terbaru
              </Link>
            </div>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-8">
            <Link
              href="/account"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <UserIcon className="h-5 w-5" />
              <span>{isAuthenticated ? user?.name || 'Akun' : 'Masuk'}</span>
            </Link>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  )
}
