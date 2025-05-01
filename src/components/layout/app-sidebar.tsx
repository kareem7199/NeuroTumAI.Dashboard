import * as React from "react"
import {
  BriefcaseMedical,
  Home,
  Hospital
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import { AppName } from "./AppName"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Doctors",
      url: "#",
      icon: BriefcaseMedical,
      isActive: true,
      items: [
        {
          title: "Pending Doctors",
          url: "/doctors/pending",
        }
      ],
    },
    {
      title: "Clinics",
      url: "#",
      icon: Hospital,
      isActive: true,
      items: [
        {
          title: "Pending Clinics",
          url: "/clinics/pending",
        }
      ],
    },

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppName />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
