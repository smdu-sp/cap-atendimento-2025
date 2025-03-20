/** @format */

'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FilterEnviaDados } from '@/types/filter-enviar-dados';
import { useEffect, useState } from 'react';

export function AgendamentoPorMotivo({ enviarDados }: FilterEnviaDados) {
	const [motivo, setMotivo] = useState('all');

	useEffect(() => {
		return enviarDados('motivoId', motivo);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [motivo]);

	return (
		<div className='flex items-end gap-5'>
			<div className='flex flex-col'>
				<p>Motivo</p>
				<Select
					onValueChange={setMotivo}
					defaultValue={motivo}>
					<SelectTrigger className='w-60 text-nowrap bg-background'>
						<SelectValue placeholder='Selecione o Motivo' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value='all'
							className='text-nowrap'>
							Todas os motivos
						</SelectItem>
						<SelectItem value='COMUNICADO'>
							Atendimento Técnico - Comunicado
						</SelectItem>
						<SelectItem value='RECURSO'>
							Atendimento Técnico - Recurso
						</SelectItem>
						<SelectItem value='CONSULTA'>
							Sala Arthur Saboya (Consulta Pré-Projeto)
						</SelectItem>
						<SelectItem value='P-ENT/RET'>
							Protocolo (Entrega / Retirada de Documentos Físicos)
						</SelectItem>
						<SelectItem value='P-COM/INDEF'>
							Protocolo (Comunicado / Indeferimento)
						</SelectItem>
						<SelectItem value='N-FSP'>
							Notificação - Função Social da Propriedade
						</SelectItem>
						<SelectItem value='VI'>Visita Institucional</SelectItem>
						<SelectItem value='EVENTO'>Evento</SelectItem>
						<SelectItem value='VPF'>Vistas a Processo Físico</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
