/** @format */

import Breadcrumbs from '@/components/breadcrumbs';
import { DrawerMenu } from '@/components/drawer-menu';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ModeToggle } from '@/components/toggle-theme';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function RotasAuth({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session) redirect('/login');
	return (
		<div className='relative  w-full pb-10 md:pb-0'>
			<ModeToggle className='absolute top-4 right-4 z-50' />
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className='h-16 bg-muted dark:bg-background shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 hidden sm:flex'>
						<div className='flex items-center gap-2 px-4'>
							<SidebarTrigger className='-ml-1 md:hidden' />
							<Separator
								orientation='vertical'
								className='mr-2 h-4 md:ml-[-16px]'
							/>
							<Breadcrumbs />
						</div>
					</header>
					<div className='flex flex-1 flex-col gap-4 p-4 sm:pt-0 relative items-center w-full bg-muted dark:bg-background'>
						<div className='min-h-100 w-full  flex-1 md:min-h-min pt-10 sm:pt-0'>
							{children}
						</div>
					</div>
				</SidebarInset>
				<DrawerMenu />
			</SidebarProvider>
		</div>
	);
}
