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
	data: IMotivo[] | null | IPaginadoMotivo;
	status: number;
}

export interface ICreateMotivo {
	texto: string;
	status?: boolean;
}

export interface IUpdateMotivo {
	texto?: string;
	status?: boolean;
}

export interface IPaginadoMotivo {
	data: IMotivo[];
	total: number;
	pagina: number;
	limite: number;
}
