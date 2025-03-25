/** @format */

'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { IMotivo } from '@/types/motivo';
import { useEffect, useState } from 'react';

interface AgendamentoPorMotivoProps {
	motivos: IMotivo[];
	enviarDados: (id: string, valor: string) => void;
}

export function AgendamentoPorMotivo({
	enviarDados,
	motivos,
}: AgendamentoPorMotivoProps) {
	const [motivo, setMotivo] = useState('all');

	useEffect(() => {
		return enviarDados('motivoId', motivo);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [motivo]);

	return (
		<div className='flex items-end gap-5 w-full'>
			<div className='flex flex-col w-full'>
				<p>Motivo</p>
				<Select
					onValueChange={setMotivo}
					defaultValue={motivo}>
					<SelectTrigger className='w-full md:w-60 text-nowrap bg-background'>
						<SelectValue placeholder='Selecione o Motivo' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value='all'
							className='text-nowrap'>
							Todas os motivos
						</SelectItem>
						{motivos.map((item) => {
							return (
								<SelectItem
									key={item.id}
									value={item.id}>
									{item.texto}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
