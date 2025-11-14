"use client"
import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {

  return (
    <SidebarMenu> 
            <SidebarMenuButton
              size="lg"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">ogp</span>
                <span className="truncate text-xs">abcd</span>
              </div>
            </SidebarMenuButton>
    </SidebarMenu>
  )
}
