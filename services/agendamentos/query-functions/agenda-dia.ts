/** @format */

import { auth } from '@/lib/auth/auth';
import {
	IAgendamento,
	IDashboardAgendamento,
	IRespostaAgendamento,
} from '@/types/agendamentos';
import { redirect } from 'next/navigation';


export async function agendaDia({ busca }: { busca: string }): Promise<IRespostaAgendamento> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const session = await auth();
	if (!session) redirect('/login');
	try {
		const agendamentos = await fetch(
			`${baseURL}agendamentos/hoje?busca=${busca}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.access_token}`,
				},
				next: { tags: ['agendamentos'], revalidate: 60 },
			},
		);
		const data = await agendamentos.json();
		if (agendamentos.status === 200)
			return {
				ok: true,
				error: null,
				data: data as IAgendamento[],
				status: 200,
			};
		return {
			ok: false,
			error: data.message,
			data: null,
			status: data.statusCode,
		};
	} catch (error) {
		return {
			ok: false,
			error: 'Não foi possível buscar a lista de agendamentos do dia:' + error,
			data: null,
			status: 400,
		};
	}
}
