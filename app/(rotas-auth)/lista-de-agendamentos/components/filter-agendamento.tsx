/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { AgendamentoPorProcesso } from './agendamento-por-processo';

export function FilterAgendamento() {
	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='flex items-end flex-wrap gap-5 w-full'>
				{/* <AgendamentoPorData /> */}
				{/* <AgendamentoPorHorario /> */}
				{/* <AgendamentoPorCoordenadoria /> */}
				{/* <AgendamentoPorMotivo /> */}
				<AgendamentoPorProcesso />
				<Button className='w-fit'>
					Atualizar <RefreshCw />
				</Button>
			</div>
		</div>
	);
}
