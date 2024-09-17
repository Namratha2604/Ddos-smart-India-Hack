import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <nav className="flex items-center space-x-4">
            <Link className="text-sm font-medium hover:underline" href="#">
              Home Page
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              About Us
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:underline flex items-center">
                Services Menu
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                    Service 1
                  </Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                    Service 2
                  </Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">
                    Service 3
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="text-2xl font-bold">Logo</div>
          <Button variant="outline">Join</Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Empowering India&apos;s Defence for a Secure Future</h1>
            <p className="mb-6">
              Welcome to the Ministry of Defence India, where we are dedicated to safeguarding our nation&apos;s
              sovereignty and ensuring peace. Join us in our mission to strengthen our armed forces and foster national
              security.
            </p>
            <div className="space-x-4">
              <Button>Learn More</Button>
              <Button variant="outline">Sign Up</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/placeholder.svg"
              alt="Defence Image 1"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/placeholder.svg"
              alt="Defence Image 2"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/placeholder.svg"
              alt="Defence Image 3"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/placeholder.svg"
              alt="Defence Image 4"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  )
}