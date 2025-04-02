/** @format */

import { auth } from '@/lib/auth/auth';
import {
	IDashboardAgendamento,
	IRespostaAgendamento,
} from '@/types/agendamentos';
import { redirect } from 'next/navigation';

export async function dashboard(
	motivoId?: string,
	coordenadoriaId?: string,
	periodo?: string
): Promise<IRespostaAgendamento> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	try {
		const agendamentos = await fetch(
			`${baseURL}agendamentos/dashboard?motivoId=${motivoId}&coordenadoriaId=${coordenadoriaId}&periodo=${periodo}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.access_token}`,
				},
				next: { tags: ['dashboard'], revalidate: 120 },
			},
		);
		const data = await agendamentos.json();
		if (agendamentos.status === 200)
			return {
				ok: true,
				error: null,
				data: data as IDashboardAgendamento,
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
			error: 'Não foi possível buscar a lista de agendamentos:' + error,
			data: null,
			status: 400,
		};
	}
}
