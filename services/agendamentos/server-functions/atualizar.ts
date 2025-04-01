/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { IRespostaAgendamento, IUpdateAgendamento } from '@/types/agendamentos';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function atualizar(
	id: string,
	data: IUpdateAgendamento,
): Promise<IRespostaAgendamento> {
	const session = await auth();
	if (!session) redirect('/login');
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response: Response = await fetch(
			`${baseURL}agendamentos/atualizar/${id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.access_token}`,
				},
				body: JSON.stringify(data),
			},
		);
		const dataResponse = await response.json();
		if (response.status === 200) {
			revalidatePath('/');
			return {
				ok: true,
				error: null,
				data: dataResponse,
				status: 200,
			};
		}
		if (!dataResponse) {
			return {
				ok: false,
				error: 'Erro ao atualizar agendamento.',
				data: null,
				status: 500,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			error: 'Erro ao atualizar agendamento.',
			data: null,
			status: 500,
		};
	}

	// Default return statement to handle unexpected cases
	return {
		ok: false,
		error: 'Erro inesperado',
		data: null,
		status: 500,
	};
}
