import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { getColorClassName } from '@/lib/utils.js'
import Image from 'next/image'
import nodeLogo from '@/images/logos/node.svg'
import paylaterLogo from '@/images/logos/paylater2.svg'
import psd2Logo from '@/images/logos/umbrella.svg'
import accountLogo from '@/images/logos/account.svg'
import paymentLogo from '@/images/logos/payst.svg'
import fundsLogo from '@/images/logos/funds-cash.svg'
import bookLogo from '@/images/logos/book.svg'
import glossaryLogo from '@/images/logos/glossary.svg'
import rocketLogo from '@/images/logos/rocket2.svg'
import sdkLogo from '@/images/logos/sdk.svg'
import webhookLogo from '@/images/logos/webhook.svg'
import errorLogo from '@/images/logos/error.svg'
import paginationLogo from '@/images/logos/pagination.svg'
import authLogo from '@/images/logos/lock.svg'
import homeLogo from '@/images/logos/home.svg'
import whatLogo from '@/images/logos/what.svg'
import workLogo from '@/images/logos/work.svg'
import jumpLogo from '@/images/logos/jump.svg'
import flashLogo from '@/images/logos/flash.svg'
import wrenchLogo from '@/images/logos/wrench.svg'
import devsLogo from '@/images/logos/devs.svg'
import fintechLogo from '@/images/logos/pig.svg'
import keyLogo from '@/images/logos/key.svg'
import envLogo from '@/images/logos/env.svg'
import faqLogo from '@/images/logos/question.svg'
import terminalLogo from '@/images/logos/terminal.svg'
import developerLogo from '@/images/logos/developer.svg'
import sandboxLogo from '@/images/logos/sandboxf.svg'
import cogLogo from '@/images/logos/cog.svg'
import contractLogo from '@/images/logos/contract.svg'
import basketLogo from '@/images/logos/basket.svg'
import merchantLogo from '@/images/logos/merchant-alt.svg'
import powerstartLogo from '@/images/logos/powerstart.svg'
import portalLogo from '@/images/logos/imac2.svg'
import loginLogo from '@/images/logos/login.svg'
import appLogo from '@/images/logos/apps.svg'
import accountsLogo from '@/images/logos/account.svg'
import profileLogo from '@/images/logos/profile.svg'
import bnplboxLogo from '@/images/logos/bnplbox.svg'
import playLogo from '@/images/logos/playground.svg'
import consentsLogo from '@/images/logos/consents.svg'
import transactionsLogo from '@/images/logos/transactions.svg'
import cardLogo from '@/images/logos/card.svg'
import paymentauthLogo from '@/images/logos/card-lock.svg'
import supportLogo from '@/images/logos/lifejacket.svg'
import signupLogo from '@/images/logos/signup.svg'
//import environmentLogo from '@/images/logos/code-square2.svg'
import environmentLogo from '@/images/logos/env-circle.svg'



{/* import accountsLogo from '@/images/logos/accounts.svg' */}



function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'nav-item',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active ? 'nav-item-active' : 'nav-item-default',
        'flex justify-between gap-2 py-1 pr-3 text-sm transition'
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag className={getColorClassName(tag)} variant="small">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === router.pathname) !== -1 ||
    group.links
      .find(({ title }) => title === 'PSD2')
      ?.children?.map(({ href }) => href === router.pathname)
  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={router.pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === router.pathname}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {link.icon && (
                    <Image
                      src={link.icon}
                      alt=""
                      style={{
                        height: '20px',
                        width: 'auto',
                      }}
                      unoptimized
                    />
                  )}
                  {link.title}
                </div>
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {(link.href === router.pathname ||
                  link?.children
                    ?.map(({ href }) => href)
                    .includes(router.pathname)) &&
                  link?.children?.length > 0 && (
                    <motion.ul
                      role="list"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.1 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15 },
                      }}
                    >
                      {link.children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            href={`${child.href}`}
                            tag={child.tag}
                            isAnchorLink
                          >
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {child.icon && (
                                <Image
                                  src={child.icon}
                                  alt=""
                                  style={{
                                    height: '20px',
                                    width: 'auto',
                                  }}
                                  unoptimized
                                />
                              )}
                              {child.title}
                            </div>
                          </NavLink>
                          <AnimatePresence mode="popLayout" initial={false}>
                            {child.href === router.pathname &&
                              sections.length > 0 && (
                                <motion.ul
                                  role="list"
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: 1,
                                    transition: { delay: 0.1 },
                                  }}
                                  exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15 },
                                  }}
                                >
                                  {sections.map((section) => (
                                    <li
                                      key={section.id}
                                      style={{ paddingLeft: '12px' }}
                                    >
                                      <NavLink
                                        href={`${child.href}#${section.id}`}
                                        tag={section.tag}
                                        isAnchorLink
                                      >
                                        {section.title}
                                      </NavLink>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                          </AnimatePresence>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                {link.href === router.pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation = [
  {
    title: 'Welcome',
    links: [
      //{ title: 'Introduction', href: '/' },
      { title: 'What is snappi?', href: '/whatisnappi', icon: flashLogo },
      //{ title: 'How snappi works?', href: '/howsnappiworks', icon:cogLogo },
    ],
  },
  {
    title: 'Developers',
    links: [
      //{ title: 'Introduction', href: '/' },
      { title: 'Portal', href: '/portal', icon: portalLogo },
      { title: 'Signup', href: '/signup', icon: signupLogo },
      { title: 'Create apps', href: '/create-apps', icon: appLogo },
    ],
  },    
  {
    title: 'API fundamentals',
    links: [
      //{ title: 'Introduction', href: '/' },
      { title: 'Quickstart', href: '/quickstart', icon: rocketLogo },
      { title: 'Authentication', href: '/authentication', icon: authLogo },
      { title: 'SDKs', href: '/sdks', icon: sdkLogo },
      //{ title: 'Pagination', href: '/pagination', icon:paginationLogo, }, 
      { title: 'Errors', href: '/errors', icon: errorLogo },
      { title: 'Environment', href: '/environment', icon: environmentLogo },
    ],
  },
  {
    title: 'Pay Later API',
    links: [
      {
        title: 'What is Pay Later?',
        href: '/pay-later-overview',
        icon: paylaterLogo,
      },
      {
        title: 'Merchant',
        href: '/merchant',
        icon: merchantLogo,
      },           
      {
        title: 'Basket',
        href: '/basket',
        icon: basketLogo,
      },      
      {
        title: 'Sandbox',
        href: '/pay-later-sandbox',
        icon: sandboxLogo,
      },                     
    ],
  },
  {
    title: 'PSD2 API',
    links: [
      {
        title: 'What is PSD2?',
        href: '/psd2-overview',
        icon: psd2Logo,
      },           
      {
        title: 'Accounts',
        href: '/psd2-accounts',
        icon: accountsLogo,
      },    
      {
        title: 'Payments',
        href: '/psd2-payments',
        icon: paymentLogo,
      },                                       
      {
        title: 'Funds',
        href: '/psd2-funds',
        icon: fundsLogo,
      },        
    ],
  },
  {
    title: 'Glossary',
    links: [
      //{ title: 'Introduction', href: '/' },
      { title: 'Developers', href: '/developers-glossary', icon: devsLogo },
      { title: 'Banking', href: '/banking-glossary', icon: fintechLogo },
    ],
  },
  {
    title: 'Support',
    links: [
      //{ title: 'Introduction', href: '/' },
      { title: 'Contact', href: '/contact', icon: supportLogo },
    ],
  },  
]

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 && 'md:mt-0'}
          />
        ))}
      </ul>
    </nav>
  )
}
