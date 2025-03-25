/** @format */

'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ICoordenadoria } from '@/types/coordenadoria';
import { useEffect, useState } from 'react';

interface AgendamentoPorCoordenadoriaProps {
	coordenadorias: ICoordenadoria[];
	enviarDados: (id: string, valor: string) => void;
}

export function AgendamentoPorCoordenadoria({
	enviarDados,
	coordenadorias,
}: AgendamentoPorCoordenadoriaProps) {
	const [coordenadoria, setCoordenadoria] = useState('all');

	useEffect(() => {
		return enviarDados('coordenadoriaId', coordenadoria);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coordenadoria]);

	return (
		<div className='flex items-end gap-5 w-full'>
			<div className='flex flex-col w-full'>
				<p>Coordenadoria</p>
				<Select
					onValueChange={setCoordenadoria}
					defaultValue={coordenadoria}>
					<SelectTrigger className='w-full md:w-60 text-nowrap bg-background'>
						<SelectValue placeholder='Selecione a coordenadoria' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value='all'
							className='text-nowrap'>
							Todas as coordenadorias
						</SelectItem>
						{coordenadorias.map((item) => {
							return (
								<SelectItem
									key={item.id}
									value={item.id}>
									{item.sigla}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
