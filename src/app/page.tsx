import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Target } from "lucide-react"
import { Box } from "lucide-react"

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
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6">
            Explore the Vital Benefits and Responsibilities of the Ministry of Defence
          </h1>
          <p className="text-lg mb-8">
            The Ministry of Defence plays a crucial role in safeguarding the nation. It ensures the security and integrity of India through strategic defense initiatives.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2" />
                  National Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                Protecting the sovereignty and territorial integrity of India is our top priority.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2" />
                  Defense Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                Maintaining a state of readiness to respond to any threat or challenge.
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="lg:w-1/3 bg-gray-200 rounded-lg flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt="Ministry of Defence"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Ensuring National Security: Our Commitment to a Safer Nation
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {['Innovative Defence Research', 'Military Training Programs', 'Collaboration in Defence'].map((title, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src="/placeholder.svg"
                alt={title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">{title}</CardTitle>
              <p className="text-sm text-gray-600 mb-4">
                {index === 0 && "Our national security initiatives are designed to protect and serve the nation."}
                {index === 1 && "We offer comprehensive training programs to prepare our forces for any situation."}
                {index === 2 && "We engage with international allies to enhance collective defence capabilities."}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                {index === 0 && "Learn More"}
                {index === 1 && "Sign Up"}
                {index === 2 && "Join Us"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Key Statistics of India&apos;s Defence Forces</h2>
          <p className="mb-4">
            India boasts one of the largest armed forces in the world, with over 1.4 million active personnel. Our commitment to national security is reflected in our robust defense capabilities.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">Learn More</Button>
            <Button>Explore</Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-around">
          <div className="text-center">
            <p className="text-4xl font-bold">50%</p>
            <p className="text-sm">Increase in defense budget over the last decade.</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">50%</p>
            <p className="text-sm">Women in the armed forces have doubled.</p>
          </div>
        </div>
      </div>
    </div><div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Ensuring National Security: Our Commitment to a Safer Nation
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {['Innovative Defence Research', 'Military Training Programs', 'Collaboration in Defence'].map((title, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src="/placeholder.svg"
                alt={title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">{title}</CardTitle>
              <p className="text-sm text-gray-600 mb-4">
                {index === 0 && "Our national security initiatives are designed to protect and serve the nation."}
                {index === 1 && "We offer comprehensive training programs to prepare our forces for any situation."}
                {index === 2 && "We engage with international allies to enhance collective defence capabilities."}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                {index === 0 && "Learn More"}
                {index === 1 && "Sign Up"}
                {index === 2 && "Join Us"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Key Statistics of India&apos;s Defence Forces</h2>
          <p className="mb-4">
            India boasts one of the largest armed forces in the world, with over 1.4 million active personnel. Our commitment to national security is reflected in our robust defense capabilities.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">Learn More</Button>
            <Button>Explore</Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-around">
          <div className="text-center">
            <p className="text-4xl font-bold">50%</p>
            <p className="text-sm">Increase in defense budget over the last decade.</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">50%</p>
            <p className="text-sm">Women in the armed forces have doubled.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">Understanding the Ministry of Defence Structure</h1>
          <p className="text-lg text-muted-foreground">
            The Ministry of Defence plays a crucial role in ensuring national security and defense policy formulation. It oversees the armed forces and coordinates with various departments to maintain operational readiness. Through strategic planning and resource management, the ministry safeguards the nation&apos;s interests.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Key Components of the Ministry of Defence",
            description: "The ministry comprises several departments, each with specific functions.",
          },
          {
            title: "How the Ministry Operates Effectively",
            description: "Collaboration among departments ensures streamlined operations.",
          },
          {
            title: "Commitment to National Security and Defense",
            description: "The ministry prioritizes the safety of the nation.",
          },
        ].map((item, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-grow">
              <Image
                src="/placeholder.svg"
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" className="mr-2">Learn More</Button>
              {index === 0 && <Button>Sign Up</Button>}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Comprehensive Services Offered by the Ministry of Defence, India</h2>
        <p className="text-lg text-muted-foreground mb-6">
          The Ministry of Defence provides a wide range of services aimed at ensuring national security and defense. Our commitment includes strategic planning, procurement of defense equipment, and fostering international defense cooperation. We are dedicated to supporting our armed forces and enhancing the safety of our nation.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Strategic Defense Planning and National Security Initiatives",
              description: "We prioritize the safety and security of our nation.",
              action: "Learn More",
            },
            {
              title: "Procurement and Management of Defense Equipment and Resources",
              description: "We ensure the armed forces are equipped with the best resources.",
              action: "Sign Up",
            },
            {
              title: "International Cooperation for Enhanced Defense Capabilities",
              description: "We collaborate with global partners to strengthen our defense posture.",
              action: "Contact",
            },
          ].map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Box className="w-10 h-10 mb-2" />
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline">{service.action}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
    
  )
}