import Image from 'next/image';
import {Button} from '@/components/Button';
import {Heading} from '@/components/Heading';
import logoBnpl from '@/images/logos/bnpl.svg';
import logoPSD2 from '@/images/logos/umbrella.svg';
import logoPSD2Account from '@/images/logos/psd2-account.svg';
import logoPSD2Payment from '@/images/logos/psd2-payment.svg';
import logoPSD2Funds from '@/images/logos/psd2-funds.svg';

const resources = [
	{
		href: '/pay-later-overview',
		name: 'Pay Later',
		description:
      'Purchase goods & defer payment for a period of time.',
		logo: logoBnpl,
	},
	{
		href: '/psd2-overview',
		name: 'PSD2',
		description: 'View balances, confirm funds availability and make payments on behalf of users who have given them explicit consent.',
		logo: logoPSD2,
	},	
];

export function Resources() {
	return (
		<div className='my-16 xl:max-w-none'>
			<Heading level={2} id='official-libraries'>
        APIs
			</Heading>
			<div className='not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-4'>
				{resources.map(resource => (
					<div key={resource.name} className='flex flex-row-reverse gap-6'>
						<div className='flex-auto'>
							<h3 className='text-sm font-semibold text-zinc-900 dark:text-white'>
								{resource.name}
							</h3>
							<p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
								{resource.description}
							</p>
							<p className='mt-4'>
								<Button href={resource.href} variant='text' arrow='right'>
                  Read more
								</Button>
							</p>
						</div>
						<Image
							src={resource.logo}
							alt=''
							className='h-12 w-12'
							unoptimized
						/>
					</div>
				))}
			</div>
		</div>
	);
}
