
import clsx from 'clsx';
import {Heading} from '@/components/Heading';

export {Button} from '@/components/Button';
export {CodeGroup, Code as code, Pre as pre} from '@/components/Code';

import { Collapse } from "../components/Collapse";


export const h2 = function H2(props) {
	return <Heading level={2} {...props} />;
};

function InfoIcon(props) {
	return (
		<svg viewBox='0 0 16 16' aria-hidden='true' {...props}>
			<circle cx='8' cy='8' r='8' strokeWidth='0' />
			<path
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='1.5'
				d='M6.75 7.75h1.5v3.5'
			/>
			<circle cx='8' cy='4' r='.5' fill='none' />
		</svg>
	);
}



function TipIcon(props) {
	return (
	    <svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
		    <path
			     fill="none"
		         strokeLinecap="round"
		         strokeLinejoin="round"
		         d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
		    />
	    </svg>
	);
}

export function Important({children}) {
	return (
		<div className='my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]'>
			<InfoIcon className='mt-1 h-4 w-4 flex-none fill-red-500 stroke-white dark:fill-pink-200/20 dark:stroke-emerald-200' />
			<div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>
				{children}
			</div>
		</div>
	);
}

export function Note({children}) {
	return (
		<div className='my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]'>
			<InfoIcon className='mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200' />
			<div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>
				{children}
			</div>
		</div>
	);
}

export function Tip({children}) {
	return (
		<div className='my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]'>
			<TipIcon className='mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200' />
			<div className='[&>:first-child]:mt-0 [&>:last-child]:mb-0'>
				{children}
			</div>
		</div>
	);
}

export function Row({children}) {
	return (
		<div className='grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2'>
			{children}
		</div>
	);
}

export function Col({children, sticky = false}) {
	return (
		<div
			className={clsx(
				'[&>:first-child]:mt-0 [&>:last-child]:mb-0',
				sticky && 'xl:sticky xl:top-24',
			)}
		>
			{children}
		</div>
	);
}

export function Properties({children,title}) {
	return (
		<Collapse title={title}> {/* Wrapping under the Collapse component with a title */}
		<div className='my-6'>
			<ul
				role='list'
				className='m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5'
			>
				{children}
			</ul>
		</div>
	</Collapse>
	);
}

export function Property({name, type, children}) {
	return (
		<li className='m-0 px-0 py-4 first:pt-0 last:pb-0'>
			<dl className='m-0 flex flex-wrap items-center gap-x-3 gap-y-2'>
				<dt className='sr-only'>Name</dt>
				<dd>
					<code>{name}</code>
				</dd>
				<dt className='sr-only'>Type</dt>
				<dd className='font-mono text-xs text-zinc-400 dark:text-zinc-500'>
					{type}
				</dd>
				<dt className='sr-only'>Description</dt>
				<dd className='w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0'>
					{children}
				</dd>
			</dl>

			{children && (
                <ul role="list" className="pl-6 list-none">
                {children}
                </ul>  
            )}			
		</li>
	);
}

export function SubProperty({ name, type, children }) {
	return (

	<Collapse title={name}>
	  <li className="m-0 px-0 py-2">
		<code>{name}</code>
		<span className="text-xs text-zinc-400">{type}</span> 

		{children && (
                <ul role="list" className="pl-6 list-none">
                {children}
                </ul>  
            )}	
	  </li>
	</Collapse>
	);
  }

export function SubSubProperty({ children }) {
	return (
		<li className="m-0 px-0 py-2">
		<code>{name}</code>
		<span className="text-xs text-zinc-400">{type}</span> 
		</li>
	);
	
}

export function Steps({ children }) {
	return <div className="steps">{children}</div>
  }
  
  export function Step({ children }) {
	return <div className="step">{children}</div>
  }

export {default as a} from 'next/link';
