"use client"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useState, createContext, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const SidebarContext = createContext(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  )
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/10 w-[280px] flex-shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "280px" : "70px") : "280px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          "h-14 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Menu
            className="text-gray-900 dark:text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-[#0a0a0a] p-6 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-6 top-6 z-50 text-gray-900 dark:text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}) => {
  const { open, animate } = useSidebar()

  const content = (
    <>
      <span className={cn(
        "flex-shrink-0 transition-colors",
        link.active
          ? "text-gray-900 dark:text-white"
          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      )}>
        {link.icon}
      </span>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "text-sm font-medium group-hover:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
          link.active
            ? "text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        )}
      >
        {link.label}
      </motion.span>
    </>
  )

  // External link veya onClick handler
  if (link.href?.startsWith('http') || link.href === '#' || onClick) {
    return (
      <a
        href={link.href}
        onClick={onClick}
        className={cn(
          "flex items-center justify-start gap-3 group py-2.5 px-3 rounded-xl transition-colors",
          link.active
            ? "bg-gray-100 dark:bg-white/10"
            : "hover:bg-gray-50 dark:hover:bg-white/5",
          className
        )}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group py-2.5 px-3 rounded-xl transition-colors",
        link.active
          ? "bg-gray-100 dark:bg-white/10"
          : "hover:bg-gray-50 dark:hover:bg-white/5",
        className
      )}
      {...props}
    >
      {content}
    </Link>
  )
}

export default Sidebar
