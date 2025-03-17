/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { AgendamentoPorCPF } from './agendamento-por-cpf';
import { AgendamentoPorData } from './agendamento-por-data';
import { AgendamentoPorHorario } from './agendamento-por-horario';
import { AgendamentoPorProcesso } from './agendamento-por-processo';
import { AgendamentoPorMotivo } from './agendamento-por-motivo';
import { AgendamentoPorCoordenadoria } from './agendamento-por-coordenadoria';

export function FilterAgendamento() {
	return (
		<div className='flex flex-col gap-4'>
			<div className='grid grid-cols-3 gap-4 w-full'>
				<AgendamentoPorCPF />
				<AgendamentoPorMotivo />
				<AgendamentoPorCoordenadoria />
				<AgendamentoPorProcesso />
				<AgendamentoPorData />
				<AgendamentoPorHorario />
			</div>
			<Button className='w-fit'>
				Atualizar <RefreshCw />
			</Button>
		</div>
	);
}
