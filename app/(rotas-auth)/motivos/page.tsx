/** @format */

import React from 'react';
import { listaCompleta as listaMotivos } from '@/services/motivos/query-functions/lista-completa';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import DataTable from '@/components/data-table';
import { columns } from './_components/columns';

export default async function MotivosPage() {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const motivos = await listaMotivos(session.access_token);

	if (!motivos.data || !motivos.ok) {
		return (
			<div className='text-muted-foreground italic'>Dados não encontrados</div>
		);
	}
	return (
		<div className=' w-full px-0 md:px-8 relative h-full md:container mx-auto h-full'>
			<h1 className='text-xl md:text-4xl font-bold my-5'>Motivos</h1>
			<div className='max-w-screen'>
				<DataTable
					columns={columns}
					data={motivos.data}
				/>
			</div>
		</div>
	);
}
