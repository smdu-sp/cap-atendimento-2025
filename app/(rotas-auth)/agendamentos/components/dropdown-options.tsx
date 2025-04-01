/** @format */

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';
import ModalFormAgendamento from './modal-create-agendamento';
import ModalImportAgendamento from './modal-import';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { listaCompleta as listaCoordenadorias } from '@/services/coordenadorias/query-functions/lista-completa';
import { listaCompleta as listaMotivos } from '@/services/motivos/query-functions/lista-completa';
import { buscarTecnicos } from '@/services/usuarios/query-functions/buscar-tecnicos';
import { IUsuarioTecnico } from '@/types/usuario';
import { IMotivo } from '@/types/motivo';
import { ICoordenadoria } from '@/types/coordenadoria';

export default async function DropdownImportacao() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	console.log(session);
	const motivos = await listaMotivos(session.access_token);
	const coordenadorias = await listaCoordenadorias(session.access_token);
	const tecnicosResp = await buscarTecnicos(session.access_token);

	if (!motivos.ok || !coordenadorias.ok || !tecnicosResp.ok) {
		console.log(motivos.error, coordenadorias.error, tecnicosResp.error);
		return null;
	}

	if (!motivos.data || !coordenadorias.data || !tecnicosResp.data) {
		console.log('Motivos, técnicos e coordenadorias não encontrados');
		return null;
	}

	const tecnicos = tecnicosResp.data as IUsuarioTecnico[];
	const motivosData = motivos.data as IMotivo[];
	const coordenadoriasData = coordenadorias.data as ICoordenadoria[];
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<Plus />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start'>
				<DropdownMenuLabel className='font-semibold'>Opções</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<ModalImportAgendamento />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<ModalFormAgendamento
						tecnicos={tecnicos}
						motivos={motivosData}
						coordenadorias={coordenadoriasData}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
