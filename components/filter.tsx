/** @format */

'use client';

import { AgendamentoPorCoordenadoria } from '@/app/(rotas-auth)/lista-de-agendamentos/components/agendamento-por-coordenadoria';
import { AgendamentoPorData } from '@/app/(rotas-auth)/lista-de-agendamentos/components/agendamento-por-data';
import { AgendamentoPorMotivo } from '@/app/(rotas-auth)/lista-de-agendamentos/components/agendamento-por-motivo';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function Filter() {
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

	console.log(params);
	return (
		<div className='flex items-end gap-5 w-full'>
			<AgendamentoPorMotivo enviarDados={receberDadosDoFilho} />
			<AgendamentoPorCoordenadoria enviarDados={receberDadosDoFilho} />
			<AgendamentoPorData enviarDados={receberDadosDoFilho} />
			<Button
				onClick={() => startTransition(() => handleClick())}
				disabled={isPending}
				className='w-fit'>
				Atualizar{' '}
				{isPending ? <RefreshCw className='animate-spin' /> : <RefreshCw />}
			</Button>
		</div>
	);
}
