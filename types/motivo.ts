/** @format */

import { IAgendamento } from './agendamentos';

export interface IMotivo {
	id: string;
	texto: string;
	status: boolean;
	criadoEm: Date;
	atualizadoEm: Date;
	agendamentos?: IAgendamento[];
}

export interface IRespostaMotivo {
	ok: boolean;
	error: string | null;
	data: IMotivo[] | null;
	status: number;
}
