/** @format */

'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface AgendamentoPorTecnicoProps {
	enviarDados: (id: string, valor: string) => void;
}

export function AgendamentoPorTecnico({
	enviarDados,
}: AgendamentoPorTecnicoProps) {
	const [tecnico, setTecnico] = useState('');

	useEffect(() => {
		return enviarDados('tecnico', tecnico);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tecnico]);

	return (
		<div className='flex w-full gap-5'>
			<div className='flex flex-col w-full md:w-60 '>
				<p>Técnico</p>
				<Input
					value={tecnico}
					onChange={(e) => setTecnico(e.target.value)}
					className='bg-background'
					placeholder='Buscar por técnico -  nome/RF'
				/>
			</div>
		</div>
	);
}
