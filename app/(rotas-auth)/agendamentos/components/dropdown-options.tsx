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
import { IUsuario, IUsuarioTecnico } from '@/types/usuario';
import { IMotivo } from '@/types/motivo';
import { ICoordenadoria } from '@/types/coordenadoria';
import { validaUsuario } from '@/services/usuarios';

export default async function DropdownImportacao() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const motivos = await listaMotivos(session.access_token);
	const coordenadorias = await listaCoordenadorias(session.access_token);
	const tecnicosResp = await buscarTecnicos(session.access_token);
	const { data } = await validaUsuario();

	if (!motivos.ok || !coordenadorias.ok || !tecnicosResp.ok) {
		return null;
	}

	if (!motivos.data || !coordenadorias.data || !tecnicosResp.data) {
		return null;
	}

	const tecnicos = tecnicosResp.data as IUsuarioTecnico[];
	const motivosData = motivos.data as IMotivo[];
	const coordenadoriasData = coordenadorias.data as ICoordenadoria[];
	const usuario = data as IUsuario;
	
	return ['DEV', 'ADM'].includes(usuario.permissao.toString()) ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<Plus />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start'>
				<DropdownMenuLabel className='font-semibold'>Opções</DropdownMenuLabel>
				{['DEV', 'ADM'].includes(usuario.permissao.toString()) && <>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<ModalImportAgendamento />
					</DropdownMenuItem>
				</>}
				<DropdownMenuItem asChild>
					<ModalFormAgendamento
						tecnicos={tecnicos}
						motivos={motivosData}
						coordenadorias={coordenadoriasData}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : (
		<ModalFormAgendamento
			tecnicos={tecnicos}
			motivos={motivosData}
			coordenadorias={coordenadoriasData}
		>
			<Button>
				<Plus />
			</Button>
		</ModalFormAgendamento>
	);
}
