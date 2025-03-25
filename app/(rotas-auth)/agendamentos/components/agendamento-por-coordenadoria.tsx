/** @format */

'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FilterEnviaDados } from '@/types/filter-enviar-dados';
import { useEffect, useState } from 'react';

export function AgendamentoPorCoordenadoria({ enviarDados }: FilterEnviaDados) {
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
						<SelectItem value='RESID'>RESID</SelectItem>
						<SelectItem value='SERVIN'>SERVIN</SelectItem>
						<SelectItem value='GTEC'>GTEC</SelectItem>
						<SelectItem value='PARHIS'>PARHIS</SelectItem>
						<SelectItem value='CAP'>CAP</SelectItem>
						<SelectItem value='COMIN'>COMIN</SelectItem>
						<SelectItem value='CONTRU'>CONTRU</SelectItem>
						<SelectItem value='CAEPP'>CAEPP</SelectItem>
						<SelectItem value='ASCOM'>ASCOM</SelectItem>
						<SelectItem value='ATECC'>ATECC</SelectItem>
						<SelectItem value='ATIC'>ATIC</SelectItem>
						<SelectItem value='CASE'>CASE</SelectItem>
						<SelectItem value='DEUSO'>DEUSO</SelectItem>
						<SelectItem value='GAB'>COMIN</SelectItem>
						<SelectItem value='GAB_CI'>GAB/CI</SelectItem>
						<SelectItem value='GEOINFO'>GEOINFO</SelectItem>
						<SelectItem value='LICEN'>LICEN</SelectItem>
						<SelectItem value='PLANURB'>PLANURB</SelectItem>
						<SelectItem value='STEL'>STEL</SelectItem>
						<SelectItem value='URB'>URB</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
