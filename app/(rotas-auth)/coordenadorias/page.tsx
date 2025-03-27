/** @format */

import React from 'react';
import { listaCompleta as listaCoordenadorias } from '@/services/coordenadorias/query-functions/lista-completa';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import DataTable from '@/components/data-table';
import { columns } from './_components/columns';

export default async function CoordenadoriasPage() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const coordenadorias = await listaCoordenadorias(session.access_token);

	if (!coordenadorias.data || !coordenadorias.ok) {
		return (
			<div className='text-muted-foreground italic'>Dados não encontrados</div>
		);
	}
	return (
		<div className=' w-full px-0 md:px-8 relative h-full container mx-auto  '>
			<h1 className='text-xl md:text-4xl font-bold my-5'>Coordenadorias</h1>
			<div className=' '>
				<DataTable
					columns={columns}
					data={coordenadorias.data}
				/>
			</div>
		</div>
	);
}
