'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  'Semua',
  'Elektronik',
  'Pakaian',
  'Perhiasan'
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products', {
          next: { revalidate: 3600 }, // Cache for 1 hour
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        const mappedData = data.map(product => ({
          ...product,
          category: mapCategory(product.category)
        }))
        setProducts(mappedData)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Set some default products if fetch fails
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const mapCategory = (category) => {
    const categoryMap = {
      'electronics': 'Elektronik',
      'jewelery': 'Perhiasan',
      "men's clothing": 'Pakaian',
      "women's clothing": 'Pakaian',
    }
    return categoryMap[category] || category
  }

  const filteredProducts = products.filter(product =>
    selectedCategory === 'Semua' ? true : product.category === selectedCategory
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-8">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 relative overflow-hidden shadow-md">
            <div className="max-w-2xl relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Belanja Nyaman, Produk Berkualitas
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Temukan berbagai produk terbaik dengan harga terjangkau
              </p>
              <Button 
                size="lg"
                variant="secondary"
                className="font-medium"
              >
                Mulai Belanja
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/pattern.svg')] opacity-10" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-lg hover:shadow-sm transition-shadow"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-fr">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-full space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[60%]" />
                  </div>
                ))
              : filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-lg text-gray-600">
                {products.length === 0 
                  ? 'Gagal memuat produk. Silakan coba lagi nanti.' 
                  : 'Tidak ada produk dalam kategori ini.'}
              </p>
              {products.length === 0 && (
                <Button 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Muat Ulang
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
