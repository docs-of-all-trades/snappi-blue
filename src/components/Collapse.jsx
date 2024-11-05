
import { useCallback, useRef, useState } from "react"
import cn from "classnames"
import {ChevrondownIcon as ChevronDown} from "./icons/ChevrondownIcon"

export const Collapse = ({ title, children }) => {
  const contentRef = useRef()
  const [state, setState] = useState({ open: false, height: 0 })
  
  const toggleOpen = useCallback(() => {
    setState(s => {
      if (s.open) {
        return { open: false, height: 0 }
      } else {
        return { open: true, height: contentRef.current.scrollHeight }
      }
    })
  }, [])

  return <div className="flex flex-col border border-neutral-200 dark:border-white/20 rounded-lg px-4 mb-4">
      <div
        className="flex flex-row items-center gap-4 cursor-pointer py-3 group text-neutral-900 not-prose"
        onClick={toggleOpen}
        >
        <p className="max-w-none prose prose-neutral dark:prose-invert font-semibold flex-grow select-none transition group-hover:text-neutral-500">{ title }</p>
        <ChevronDown
          className={cn(
            "w-6 h-6 flex-none transform duration-300 text-neutral-600 dark:group-hover:text-white/80 transition",
            { "rotate-180": state.open }
          )}
        />
      </div>
      <div
        ref={contentRef}
        style={{ height: state.height }}
        className="overflow-hidden transition-all duration-200 prose prose-neutral dark:prose-invert max-w-none">
          <div className="mt-1 mb-4">
            {children}
          </div>
      </div>
    </div>
}
