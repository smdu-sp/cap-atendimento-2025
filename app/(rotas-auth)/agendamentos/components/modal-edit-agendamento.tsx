/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { listaCompleta as listaCoordenadorias } from '@/services/coordenadorias/query-functions/lista-completa';
import { listaCompleta as listaMotivos } from '@/services/motivos/query-functions/lista-completa';
import { buscarTecnicos } from '@/services/usuarios/query-functions/buscar-tecnicos';
import { IAgendamento } from '@/types/agendamentos';
import { IUsuarioTecnico } from '@/types/usuario';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';
import { useSession } from 'next-auth/react';
import FormEditAgendamento from './form-agendamento-edit';
import { IMotivo } from '@/types/motivo';
import { ICoordenadoria } from '@/types/coordenadoria';

interface ModalEditAgendamentoProps {
	agendamento: Partial<IAgendamento>;
}

export default function ModalEditAgendamento({
	agendamento,
}: ModalEditAgendamentoProps) {
	const session = useSession();

	const access_token = session.data ? session.data.access_token : '';

	const { data: motivos, error } = useQuery({
		queryKey: ['motivos', access_token],
		queryFn: () => listaMotivos(access_token),
		staleTime: 1000 * 60 * 5, // Cache por 5 minutos
	});

	const { data: coordenadorias, error: coordenadoriasError } = useQuery({
		queryKey: ['coordenadorias', access_token],
		queryFn: () => listaCoordenadorias(access_token),
		staleTime: 1000 * 60 * 5, // Cache por 5 minutos
	});

	const { data: tecnicosResp, error: tecnicosRespError } = useQuery({
		queryKey: ['tecnicos', access_token],
		queryFn: () => buscarTecnicos(access_token),
		staleTime: 1000 * 60 * 5, // Cache por 5 minutos
	});

	if (error || coordenadoriasError || tecnicosRespError) {
		return null;
	}

	if (!motivos?.data || !coordenadorias?.data || !tecnicosResp?.data) {
		return null;
	}

	const tecnicos = tecnicosResp.data as IUsuarioTecnico[];
	const motivosData = motivos.data as IMotivo[];
	const coordenadoriasData = coordenadorias.data as ICoordenadoria[];
	return (
		<Dialog>
			<DialogTrigger
				asChild
				className='flex items-center gap-3 cursor-pointer'>
				<Button
					size={'icon'}
					variant={'outline'}
					className='bg-background hover:bg-primary group transition-all ease-linear duration-200'>
					<SquarePen
						size={28}
						className='text-primary group-hover:text-white group'
					/>
					<span className='sr-only'>Edição de Agendamento</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md md:max-w-2xl'>
				<DialogHeader>
					<DialogTitle>Editar Agendamento</DialogTitle>
					<DialogDescription>
						Preencha os dados para editar agendamento{' '}
					</DialogDescription>
				</DialogHeader>
				<FormEditAgendamento
					agendamento={agendamento}
					motivos={motivosData}
					coordenadorias={coordenadoriasData}
					tecnicos={tecnicos}
				/>
			</DialogContent>
		</Dialog>
	);
}
