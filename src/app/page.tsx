"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Target } from "lucide-react"
import { Box } from "lucide-react"
import { useEffect } from "react"
import axios from "axios"
import {  useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react"

export default function Component() {

  const router = useRouter();
  const isBrowser = () => typeof window !== "undefined";
  const getIsRedirected = () => {
    if (isBrowser()) {
      const isRedirected = localStorage.getItem("redirected");
      if(isRedirected) router.replace("/captcha")
    }
  };

  getIsRedirected();

  useEffect(()=>{
		async function getUserData(){
      const response = await axios.get("/api/userData");
      if(response.data.redirectTo){
        localStorage.clear();
        localStorage.setItem("redirected", "true");
        router.replace("/captcha");
      }
    }

    getUserData();
	},[])
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
          <div className="text-2xl font-bold">Ministry of Defence India</div>
          <Button variant="outline" onClick={()=>router.push("/signup")}>Join</Button>
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
              src="/1st im.jpg"
              alt="Defence Image 1"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/2nd img.avif"
              alt="Defence Image 2"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/3rd img.avif"
              alt="Defence Image 3"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            <Image
              src="/4th img.webp"
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
            src="/5th img.jpeg"
            alt="Ministry of Defence"
            width={400}
            height={300}
            
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
                src="/6 img.webp"
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
                src="/8.avif"
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
            image: "9 img.jpeg"

          },
          {
            title: "How the Ministry Operates Effectively",
            description: "Collaboration among departments ensures streamlined operations.",
            image: "10.jpeg"
          },
          {
            title: "Commitment to National Security and Defense",
            description: "The ministry prioritizes the safety of the nation.",
            image: "12.jpeg"
          },
        ].map((item, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-grow">
              <Image
                src={`/${item.image}`}
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
    <div className="container mx-auto px-4 py-16 space-y-16">
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center">What They Say</h2>
        <p className="text-center text-gray-600">
          Their experiences shape our mission and commitment to excellence.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "The support from the Ministry has been invaluable to us.",
              author: "Rajesh Kumar",
              role: "Captain, Indian Army",
            },
            {
              quote: "Working together, we achieve greater security for our nation.",
              author: "Anita Sharma",
              role: "Major, Defence Ministry",
            },
          ].map((testimonial, index) => (
            <div key={index} className="space-y-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg font-medium">{testimonial.quote}</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <img src="/placeholder.svg" alt="Webflow logo" className="h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Join Us in Serving India</h2>
        <p className="text-gray-600">Discover how you can make a difference today.</p>
        <div className="flex justify-center space-x-4">
          <Button variant="default">Learn More</Button>
          <Button variant="outline">Get Involved</Button>
        </div>
      </section>

      <section className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Stay Informed with Our Newsletter</h2>
        <p className="text-gray-600">
          Subscribe to receive the latest updates and important announcements from the Ministry of Defence.
        </p>
        <form className="space-y-4">
          <Input type="email" placeholder="Your Email Here" />
          <Button type="submit" className="w-full">Subscribe Now</Button>
        </form>
        <p className="text-xs text-gray-500">
          By clicking Subscribe Now, you agree to our Terms and Conditions.
        </p>
      </section>
    </div>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h6 className="text-sm font-semibold mb-2">Connect</h6>
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">We&apos;re here to assist with your inquiries.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <div className="flex items-center mb-2">
              <Mail className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-semibold">Email</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Reach us via email.</p>
            <a href="mailto:info@mod.gov.in" className="text-primary hover:underline">info@mod.gov.in</a>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <Phone className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-semibold">Phone</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Call us anytime.</p>
            <a href="tel:+911234567890" className="text-primary hover:underline">+91 12345 67890</a>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-semibold">Office</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Ministry of Defence, New Delhi, India</p>
            <a href="#" className="text-primary hover:underline inline-flex items-center">
              Get Directions
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg aspect-video flex items-center justify-center overflow-hidden">
        <Image
              src="/Map.png"
              alt="Defence Image 1"
              width={783}
              height={763}
              className="w-full  h-full object-cover"
            />
        </div>
      </div>
      
      <div className="mt-16 border-t pt-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Ministry of Defence</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates on features and releases.</p>
            <form className="flex gap-2">
              <Input placeholder="Your email here" type="email" />
              <Button type="submit">Join</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">By subscribing, you consent to our Privacy Policy and receive updates from us.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Support Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Events</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Newsroom</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Resources</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Community</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">© 2024 Ministry of Defence. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Terms of Use</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Cookie Settings</a>
        </div>
      </div>
    </div>
    </div>
    
  )
}