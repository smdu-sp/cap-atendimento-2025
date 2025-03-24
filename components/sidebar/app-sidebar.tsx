/** @format */

import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { ComponentProps } from 'react';
import MiniLogo from './mini-logo';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

import { ArrowLeftFromLineIcon } from 'lucide-react';

export function AppSidebar({
	props,
}: {
	props?: ComponentProps<typeof Sidebar>;
}) {
	return (
		<Sidebar
			collapsible='icon'
			{...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg'>
							<MiniLogo />
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold text-xs '>
									Atendimento ao Público
								</span>
							</div>
							<ArrowLeftFromLineIcon />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<NavMain />
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
