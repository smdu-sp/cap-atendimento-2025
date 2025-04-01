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
	data: ICoordenadoria[] | null | IPaginadoCoordenadoria;
	status: number;
}

export interface ICreateCoordenadoria {
	sigla: string;
	status?: boolean;
}

export interface IUpdateCoordenadoria {
	sigla?: string;
	status?: boolean;
}

export interface IPaginadoCoordenadoria {
	data: ICoordenadoria[];
	total: number;
	pagina: number;
	limite: number;
}
