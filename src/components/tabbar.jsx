
import { useMemo, useState } from "react"
import cn from "classnames"

export const Tab = ({ title, className, children }) => {
  return <div className={className}>{children}</div>
}

export const Tabs = ({ children }) => {
  const [selected, setSelected] = useState(0)
  const tabTitlesAndContent = useMemo(() => {
    return React.Children.map(children, element => {
      if (!React.isValidElement(element)) {
        return undefined
      }
      return element.props
    }).filter(Boolean)
  }, [children])
  
  return <div className="flex flex-col border-b border-neutral-200 dark:border-white/20">
      <div className="flex flex-row gap-4 flex-none border-b border-neutral-200 dark:border-white/20">
        {tabTitlesAndContent?.map((c, i) =>
          (<button
            className={cn(
              "px-2 py-1 border-b-2 font-semibold text-sm", {
                "border-neutral-900 dark:border-white text-neutral-900 dark:text-white": selected === i,
                "text-neutral-500 dark:text-neutral-400 border-transparent": selected !== i,
              })}
            onClick={() => setSelected(i)}>{c.title}</button>))}
      </div>
      {tabTitlesAndContent?.[selected] &&
        <div className={tabTitlesAndContent[selected].className}>
          {tabTitlesAndContent?.[selected]?.children}
        </div>
      }
    </div>
}

<Tabs>
  <Tab title="Tab 1" className="p-8">
    Hello Tab 1
  </Tab>
  <Tab title="Tab 2">
    Hello Tab 2
  </Tab>
</Tabs>