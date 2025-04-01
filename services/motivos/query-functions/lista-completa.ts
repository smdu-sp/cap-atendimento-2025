/** @format */

import { IMotivo, IRespostaMotivo } from '@/types/motivo';

export async function listaCompleta(
	access_token: string,
): Promise<IRespostaMotivo> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	console.log(baseURL);
	try {
		const motivos = await fetch(`${baseURL}motivos/lista-completa`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
		const data = await motivos.json();
		return {
			ok: true,
			error: null,
			data: data as IMotivo[],
			status: 200,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			error: 'Não foi possível buscar a lista de motivos:' + error,
			data: null,
			status: 500,
		};
	}
}
