/** @format */

'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface AgendamentoPorProcessoProps {
	enviarDados: (id: string, valor: string) => void;
}

export function AgendamentoPorProcesso({
	enviarDados,
}: AgendamentoPorProcessoProps) {
	const [processo, setProcesso] = useState('');

	useEffect(() => {
		return enviarDados('processo', processo);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [processo]);

	return (
		<div className='flex w-full gap-5'>
			<div className='flex flex-col w-full md:w-60 '>
				<p>Busca</p>
				<Input
					value={processo}
					onChange={(e) => setProcesso(e.target.value)}
					className='bg-background'
					placeholder='Buscar por processo'
				/>
			</div>
		</div>
	);
}
