/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { AgendamentoPorBusca } from './agendamento-por-busca';

export function Filter() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const [params, setParams] = useState({
		busca: '',
	});

	function handleClick() {
		router.push(
			`/hoje?busca=${params.busca}`,
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
			<AgendamentoPorBusca enviarDados={receberDadosDoFilho} />
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
