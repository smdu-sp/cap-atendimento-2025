/** @format */

'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface AgendamentoPorBuscaProps {
	enviarDados: (id: string, valor: string) => void;
}

export function AgendamentoPorBusca({
	enviarDados
}: AgendamentoPorBuscaProps) {
	const [busca, setBusca] = useState('');

	useEffect(() => {
		return enviarDados('busca', busca);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [busca]);

	return (
		<div className='flex items-end gap-5 w-full'>
			<div className='flex flex-col w-full'>
				<p>Busca</p>
				<Input
					onChange={(e) => setBusca(e.target.value)}
					value={busca}
					placeholder='Buscar por munícipe, documento ou processo'
				/>
			</div>
		</div>
	);
}
