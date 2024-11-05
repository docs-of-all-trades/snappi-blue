import Image from 'next/image';
import {Button} from '@/components/Button';
import {Heading} from '@/components/Heading';
import logoPSD2Account from '@/images/logos/psd2-account.svg';
import logoPSD2Payment from '@/images/logos/psd2-payment.svg';
import logoPSD2Funds from '@/images/logos/psd2-funds.svg';

const calls = [
	{
		href: '/psd2-accounts',
		name: 'Account API',
		description: '',
		logo: logoPSD2Account,
	},
	{
		href: '/psd2-payments',
		name: 'Payments API',
		description: '',
		logo: logoPSD2Payment,
	},
	{
		href: '/psd2-funds',
		name: 'Funds API',
		description: '',
		logo: logoPSD2Funds,
	},
];

export function Calls() {
	return (
		<div className='my-16 xl:max-w-none'>
			<Heading level={2} id='official-libraries'></Heading>
			<div className='not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3'>
				{calls.map(call => (
					<div key={call.name} className='flex flex-row-reverse gap-6'>
						<div className='flex-auto'>
							<h3 className='text-sm font-semibold text-zinc-900 dark:text-white'>
								{call.name}
							</h3>
							<p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
								{call.description}
							</p>
							<p className='mt-4'>
								<Button href={call.href} variant='text' arrow='right'>
                  Read more
								</Button>
							</p>
						</div>
						<Image src={call.logo} alt='' className='h-12 w-12' unoptimized />
					</div>
				))}
			</div>
		</div>
	);
}
