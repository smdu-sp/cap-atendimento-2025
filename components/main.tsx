/** @format */

'use client';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { CalendarSearch, House, LucideProps, Users } from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import Breadcrumbs from './breadcrumbs';
import { DrawerMenu } from './drawer-menu';
import { ModeToggle } from './toggle-theme';

export interface IMenu {
	icone: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>;
	titulo: string;
	url?: string;
	permissao?: string;
	subItens?: ISubMenu[];
}

export interface ISubMenu {
	titulo: string;
	url: string;
}

const menuUsuario: IMenu[] = [
	{
		icone: House,
		titulo: 'Página Inicial',
		url: '/',
	},
	// {
	// 	icone: CalendarDays,
	// 	titulo: 'Agendamentos por ano',
	// 	url: '/agendamentos-por-ano',
	// },
	// {
	// 	icone: CalendarClock,
	// 	titulo: 'Agendamentos por período',
	// 	url: '/agendamentos-por-periodo',
	// },
	{
		icone: CalendarSearch,
		titulo: 'Agendamentos',
		url: '/agendamentos',
	},
];

const menuAdmin: IMenu[] = [
	{
		icone: Users,
		titulo: 'Usuários',
		url: '/usuarios',
		permissao: 'usuario_buscar_tudo',
	},
];

export default function Main({
	override = false,
	children,
}: {
	override?: boolean;
	children?: ReactNode;
}) {
	return override ? (
		children
	) : (
		<>
			<ModeToggle className='absolute top-4 right-4 z-50' />
			<SidebarProvider>
				<AppSidebar data={{ menuUsuario, menuAdmin }} />
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
				<DrawerMenu data={{ menuUsuario, menuAdmin }} />
			</SidebarProvider>
		</>
	);
}
