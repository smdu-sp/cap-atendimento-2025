/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { AgendamentoPorCoordenadoria } from './agendamento-por-coordenadoria';
import { AgendamentoPorData } from './agendamento-por-data';
import { AgendamentoPorHorario } from './agendamento-por-horario';
import { AgendamentoPorMotivo } from './agendamento-por-motivo';
import { AgendamentoPorProcesso } from './agendamento-por-processo';

export function FilterAgendamento() {
	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='flex items-end flex-wrap gap-5 w-full'>
				<AgendamentoPorData onlyInicial={true} />
				<AgendamentoPorHorario />
				<AgendamentoPorCoordenadoria />
				<AgendamentoPorMotivo />
				<AgendamentoPorProcesso />
				<Button className='w-fit'>
					Atualizar <RefreshCw />
				</Button>
			</div>
		</div>
	);
}
