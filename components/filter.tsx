/** @format */

'use client';

import { AgendamentoPorCoordenadoria } from '@/app/(rotas-auth)/agendamentos/components/agendamento-por-coordenadoria';
import { AgendamentoPorData } from '@/app/(rotas-auth)/agendamentos/components/agendamento-por-data';
import { AgendamentoPorMotivo } from '@/app/(rotas-auth)/agendamentos/components/agendamento-por-motivo';
import { Button } from '@/components/ui/button';
import { ICoordenadoria } from '@/types/coordenadoria';
import { IMotivo } from '@/types/motivo';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface FilterProps {
	motivos: IMotivo[];
	coordenadorias: ICoordenadoria[];
}
export function Filter({ coordenadorias, motivos }: FilterProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const [params, setParams] = useState({
		motivoId: '',
		coordenadoriaId: '',
		dataInicio: '',
		dataFim: '',
	});

	function handleClick() {
		router.push(
			`/?motivoId=${params.motivoId}&coordenadoriaId=${params.coordenadoriaId}&dataInicio=${params.dataInicio}&dataFim=${params.dataFim}`,
		);
	}

	const receberDadosDoFilho = (id: string, valor: string) => {
		setParams((prev) => ({
			...prev,
			[id]: valor,
		}));
	};

	return (
		<div className='flex flex-col md:flex-row md:items-end gap-5 md:w-fit '>
			<AgendamentoPorMotivo
				enviarDados={receberDadosDoFilho}
				motivos={motivos}
			/>
			<AgendamentoPorCoordenadoria
				coordenadorias={coordenadorias}
				enviarDados={receberDadosDoFilho}
			/>
			<AgendamentoPorData enviarDados={receberDadosDoFilho} />
			<Button
				onClick={() => startTransition(() => handleClick())}
				disabled={isPending}
				className='w-full md:w-fit'>
				Atualizar{' '}
				{isPending ? <RefreshCw className='animate-spin' /> : <RefreshCw />}
			</Button>
		</div>
	);
}
