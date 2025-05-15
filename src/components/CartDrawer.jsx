import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import useCartStore from '@/store/cartStore'

// Format price in IDR
const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCartStore()
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative rounded-full p-2">
          <ShoppingCartIcon className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Keranjang Belanja</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Keranjang Anda kosong</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-md p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{formatIDR(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between items-center font-medium mb-4">
                <span>Total:</span>
                <span>{formatIDR(total)}</span>
              </div>
              <Button className="w-full">
                Checkout
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
