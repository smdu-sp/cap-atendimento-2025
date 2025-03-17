/** @format */

'use client';

import { AgendamentoPorCoordenadoria } from '@/app/(rotas-auth)/lista-de-agendamentos/components/agendamento-por-coordenadoria';
import { AgendamentoPorData } from '@/app/(rotas-auth)/lista-de-agendamentos/components/agendamento-por-data';
import { AgendamentoPorMotivo } from '@/app/(rotas-auth)/lista-de-agendamentos/components/agendamento-por-motivo';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function Filter() {
	return (
		<div className='flex items-end gap-5 w-full'>
			<AgendamentoPorMotivo />
			<AgendamentoPorCoordenadoria />
			<AgendamentoPorData />
			<Button className='w-fit'>
				Atualizar <RefreshCw />
			</Button>
		</div>
	);
}
