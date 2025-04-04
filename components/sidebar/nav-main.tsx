/** @format */

import {
	Building,
	CalendarCheck,
	CalendarClock,
	CalendarSearch,
	ChevronRight,
	GitPullRequestDraft,
	House,
	LucideProps,
	Users,
} from 'lucide-react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { validaUsuario } from '@/services/usuarios';
import { IUsuario } from '@/types/usuario';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import Link from '../link';

export async function NavMain() {
	let usuario: IUsuario | null = null;
	const { ok, data } = await validaUsuario();
	if (ok && data) {
		usuario = data as IUsuario;
	}
	interface IMenu {
		icone: ForwardRefExoticComponent<
			Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
		>;
		titulo: string;
		url?: string;
		permissao?: string;
		subItens?: ISubMenu[];
	}

	interface ISubMenu {
		titulo: string;
		url: string;
	}

	const menuUsuario: IMenu[] = [
		{
			icone: House,
			titulo: 'Página Inicial',
			url: '/',
		},
		{
			icone: CalendarSearch,
			titulo: 'Agendamentos',
			url: '/agendamentos',
		},
		{
			icone: CalendarCheck,
			titulo: 'Agendamentos do dia',
			url: '/hoje',
		},
	];

	const menuAdmin: IMenu[] = [
		{
			icone: Users,
			titulo: 'Usuários',
			url: '/usuarios',
			permissao: 'usuario_buscar_tudo',
		},
		{
			icone: GitPullRequestDraft,
			titulo: 'Motivos',
			url: '/motivos',
			permissao: 'usuario_buscar_tudo',
		},
		{
			icone: Building,
			titulo: 'Coordenadorias',
			url: '/coordenadorias',
			permissao: 'usuario_buscar_tudo',
		},
	];

	const menuTecnico: IMenu[] = [
		{
			icone: CalendarClock,
			titulo: 'Meus Agendamentos',
			url: '/escala',
		},
	];

	return (
		<SidebarContent>
			<SidebarGroup className='space-y-2'>
				{menuUsuario && (
					<>
						<SidebarGroupLabel>Geral</SidebarGroupLabel>
						<SidebarMenu>
							{menuUsuario.map((item: IMenu) =>
								item.subItens ? (
									<Collapsible
										key={item.titulo}
										asChild
										className='group/collapsible'>
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton tooltip={item.titulo}>
													{item.icone && <item.icone />}
													<span>{item.titulo}</span>
													{item.subItens && (
														<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
													)}
												</SidebarMenuButton>
											</CollapsibleTrigger>
											{item.subItens && (
												<CollapsibleContent>
													<SidebarMenuSub>
														{item.subItens?.map((subItem) => (
															<SidebarMenuSubItem key={subItem.titulo}>
																<Link href={item.url || '#'}>
																	{item.icone && <item.icone />}
																	<span>{item.titulo}</span>
																</Link>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>
												</CollapsibleContent>
											)}
										</SidebarMenuItem>
									</Collapsible>
								) : (
									<SidebarMenuItem
										key={item.titulo}
										className='z-50'>
										<Link href={item.url || '#'}>
											{item.icone && <item.icone />}
											<span>{item.titulo}</span>
										</Link>
									</SidebarMenuItem>
								),
							)}
						</SidebarMenu>
					</>
				)}
				{menuAdmin &&
					usuario &&
					usuario.permissao &&
					['DEV', 'ADM'].includes(usuario.permissao.toString()) && (
						<>
							<SidebarGroupLabel>Administração</SidebarGroupLabel>
							<SidebarMenu>
								{menuAdmin.map((item) =>
									item.subItens ? (
										<Collapsible
											key={item.titulo}
											asChild
											className='group/collapsible'>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton tooltip={item.titulo}>
														{item.icone && <item.icone />}
														<span>{item.titulo}</span>
														{item.subItens && (
															<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
														)}
													</SidebarMenuButton>
												</CollapsibleTrigger>
												{item.subItens && (
													<CollapsibleContent>
														<SidebarMenuSub>
															{item.subItens?.map((subItem) => (
																<SidebarMenuSubItem key={subItem.titulo}>
																	<Link href={item.url || '#'}>
																		{item.icone && <item.icone />}
																		<span>{item.titulo}</span>
																	</Link>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													</CollapsibleContent>
												)}
											</SidebarMenuItem>
										</Collapsible>
									) : (
										<SidebarMenuItem
											key={item.titulo}
											className='z-50'>
											<Link href={item.url || '#'}>
												{item.icone && <item.icone />}
												<span>{item.titulo}</span>
											</Link>
										</SidebarMenuItem>
									),
								)}
							</SidebarMenu>
						</>
					)}
					{menuTecnico &&
					usuario &&
					usuario.permissao &&
					['TEC', 'DEV'].includes(usuario.permissao.toString()) && (
						<>
							<SidebarGroupLabel>Técnico</SidebarGroupLabel>
							<SidebarMenu>
								{menuTecnico.map((item) =>
									item.subItens ? (
										<Collapsible
											key={item.titulo}
											asChild
											className='group/collapsible'>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton tooltip={item.titulo}>
														{item.icone && <item.icone />}
														<span>{item.titulo}</span>
														{item.subItens && (
															<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
														)}
													</SidebarMenuButton>
												</CollapsibleTrigger>
												{item.subItens && (
													<CollapsibleContent>
														<SidebarMenuSub>
															{item.subItens?.map((subItem) => (
																<SidebarMenuSubItem key={subItem.titulo}>
																	<Link href={item.url || '#'}>
																		{item.icone && <item.icone />}
																		<span>{item.titulo}</span>
																	</Link>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													</CollapsibleContent>
												)}
											</SidebarMenuItem>
										</Collapsible>
									) : (
										<SidebarMenuItem
											key={item.titulo}
											className='z-50'>
											<Link href={item.url || '#'}>
												{item.icone && <item.icone />}
												<span>{item.titulo}</span>
											</Link>
										</SidebarMenuItem>
									),
								)}
							</SidebarMenu>
						</>
					)}
			</SidebarGroup>
			
		</SidebarContent>
	);
}
