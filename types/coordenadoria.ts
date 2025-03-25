/** @format */

import { IAgendamento } from './agendamentos';

export interface ICoordenadoria {
	id: string;
	sigla: string;
	status: boolean;
	criadoEm: Date;
	atualizadoEm: Date;
	agendamentos?: IAgendamento[];
}

export interface IResponseCoordenadoria {
	ok: boolean;
	error: string | null;
	data: ICoordenadoria[] | null;
	status: number;
}
