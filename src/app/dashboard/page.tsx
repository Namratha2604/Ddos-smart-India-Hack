"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Calendar,
  Flag,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`bg-card text-card-foreground w-64 fixed inset-y-0 right-0 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Ministry of Defence</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="ml-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="ml-2 h-4 w-4" />
                    Operations
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="ml-2 h-4 w-4" />
                    Intelligence
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 className="ml-2 h-4 w-4" />
                    Analytics
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="ml-2 h-4 w-4" />
                    Communications
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="ml-2 h-4 w-4" />
                    Schedule
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="ml-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-500">
              <LogOut className="ml-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b py-4 px-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <div className="flex items-center space-x-4">
              <form className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 pr-12" />
              </form>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User profile</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Defence Dashboard</h1>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Personnel</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,459,829</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Defence Budget</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹5.25T</div>
                <p className="text-xs text-muted-foreground">FY 2023-24</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Operations</CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37</div>
                <p className="text-xs text-muted-foreground">Across 12 regions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alert Level</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Normal</div>
                <p className="text-xs text-muted-foreground">Last updated: 2 hours ago</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Defence Readiness Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-40 font-medium">Army:</div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                      <span className="mr-4 text-sm font-medium">95%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-40 font-medium">Navy:</div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                      <span className="mr-4 text-sm font-medium">88%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-40 font-medium">Air Force:</div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                      <span className="mr-4 text-sm font-medium">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="operations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Operation Mountain Shield</h3>
                        <p className="text-sm text-muted-foreground">Northern Border</p>
                      </div>
                      <Badge>In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Operation Sea Guardian</h3>
                        <p className="text-sm text-muted-foreground">Arabian Sea</p>
                      </div>
                      <Badge>In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Operation Sky Sentinel</h3>
                        <p className="text-sm text-muted-foreground">Eastern Air Command</p>
                      </div>
                      <Badge variant="outline">Planned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="intelligence" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Intelligence Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Border Activity Analysis</h3>
                      <p className="text-sm text-muted-foreground">Updated 3 hours ago</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Maritime Trade Route Security</h3>
                      <p className="text-sm text-muted-foreground">Updated 1 day ago</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Cyber Threat Assessment</h3>
                      <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Personnel Training</span>
                      <span>32% of budget</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Equipment Modernization</span>
                      <span>45% of budget</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Research & Development</span>
                      <span>18% of budget</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Infrastructure</span>
                      <span>5% of budget</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function Badge({ children, variant }: { children: React.ReactNode; variant?: "default" | "outline" }) {
  const baseClasses = "px-2 py-1 rounded text-xs font-semibold"
  const variantClasses = variant === "outline" 
    ? "bg-transparent border border-primary text-primary" 
    : "bg-primary text-primary-foreground"
  
  return <span className={`${baseClasses} ${variantClasses}`}>{children}</span>
}