/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { ICreateAgendamento } from '@/types/agendamentos';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criar(data: ICreateAgendamento) {
	const session = await auth();
	if (!session) redirect('/login');
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	console.log({ data });
	try {
		const response: Response = await fetch(`${baseURL}agendamentos/criar`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
			body: JSON.stringify(data),
		});

		console.log(response);
		if (response.status === 201) {
			revalidateTag('agendamentos');
			return {
				ok: true,
				error: null,
				status: response.status,
			};
		}

		return {
			ok: false,
			error: 'Erro ao criar agendamento',
			status: response.status,
		};
	} catch (error) {
		console.log({ error });
		return {
			ok: false,
			error: 'Erro ao criar agendamento',
			status: 500,
		};
	}
}
