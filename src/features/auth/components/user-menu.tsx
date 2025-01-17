import React from 'react'
import { Settings, LogOut, User, Bell, UserPlus, Shield, Laptop, Moon, Wallet, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReusablePopover, PopoverSection, PopoverItem, PopoverDivider, PopoverBanner } from '@/shared/components/common/reusable-popover'

interface UserMenuPopoverProps {
  username: string;
  email: string;
  avatarSeed: string;
  plan: string;
  isCollapsed: boolean;
}

export function UserMenuPopover({ username, email, avatarSeed, plan, isCollapsed }: UserMenuPopoverProps) {
  const trigger = (
    <button className="group relative flex h-10 w-full items-center text-neutral-400 transition-all duration-300 ease-in-out hover:text-white cursor-pointer">
      <span className="flex h-10 w-10 items-center justify-center">
        <div className="relative h-6 w-6 overflow-hidden rounded-full bg-neutral-700">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
            alt="User avatar"
            className="h-full w-full"
          />
        </div>
      </span>
      <div
        className={cn(
          "ml-2 flex flex-col text-left transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
        )}
      >
        <span className="text-sm font-medium">{username}</span>
        <span className="text-xs text-neutral-500">{email}</span>
      </div>
    </button>
  )

  return (
    <ReusablePopover trigger={trigger} align="end">
      <PopoverSection>
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-neutral-700">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
              alt="User avatar"
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">{username}</span>
            <span className="text-xs text-neutral-500">{email}</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                {plan}
              </span>
            </div>
          </div>
        </div>
      </PopoverSection>

      <PopoverDivider />

      <PopoverSection>
        <PopoverItem icon={User} label="Profile" />
        <PopoverItem icon={Settings} label="Settings" />
        <PopoverItem icon={Bell} label="Notifications" badge="3" />
      </PopoverSection>

      <PopoverDivider />

      <PopoverSection>
        <PopoverItem icon={Wallet} label="Billing" />
        <PopoverItem icon={UserPlus} label="Team" />
        <PopoverItem icon={Shield} label="Security" />
      </PopoverSection>

      <PopoverDivider />

      <PopoverSection>
        <PopoverItem icon={Laptop} label="System Preferences" />
        <PopoverItem 
          icon={Moon} 
          label="Theme" 
          rightContent={
            <div className="flex items-center gap-1 text-xs">
              <span>Dark</span>
              <ChevronRight size={14} />
            </div>
          } 
        />
      </PopoverSection>

      <PopoverDivider />

      <PopoverSection>
        <PopoverItem 
          icon={LogOut} 
          label="Log out" 
          className="text-red-400 hover:bg-red-500/5 hover:text-red-300" 
        />
      </PopoverSection>

      <PopoverBanner>
        <p className="text-sm font-medium text-emerald-400">Upgrade to Pro</p>
        <p className="mt-0.5 text-xs text-neutral-400">
          Get access to advanced features
        </p>
        <button className="mt-2 rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-600 transition-colors duration-200">
          Upgrade now
        </button>
      </PopoverBanner>
    </ReusablePopover>
  )
}

