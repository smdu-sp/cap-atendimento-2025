/** @format */

import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Content } from './_components/content';

export default async function Escala() {
	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	if (session.usuario.permissao == 'USR') {
		redirect('/');
	}

	return (
		<div className=' w-full px-0 md:px-8 relative mb-14 h-full'>
			<h1 className='text-xl md:text-4xl font-bold my-5'>Minha Escala</h1>
			<p className='text-muted-foreground mb-8'>
				Controle de disponibilidade e visualização de agendamentos.
			</p>
			<div>
				<Content />
			</div>
		</div>
	);
}
