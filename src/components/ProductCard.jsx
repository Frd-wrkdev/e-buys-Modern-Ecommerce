import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import useCartStore from '@/store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (    <div className="group w-full">
      <Card className="border-[0.5px] border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
        <CardHeader className="px-3 py-2">
          <CardTitle className="line-clamp-1 text-sm font-medium">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3">
          <div className="relative aspect-square mb-2 h-[160px]">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-full p-2"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white/0 group-hover:bg-white/80 transition-all duration-200 opacity-0 group-hover:opacity-100">
              <Button 
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => addItem(product)}
              >
                <ShoppingCartIcon className="h-4 w-4 mr-1.5" />
                Add to Cart
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 mb-2 h-8">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.price * 15500)}
            </p>
            <span className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded">
              {product.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
