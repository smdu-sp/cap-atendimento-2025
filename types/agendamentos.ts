/** @format */

import { ICoordenadoria } from './coordenadoria';
import { IMotivo } from './motivo';
import { IUsuario } from './usuario';

export interface IAgendamento {
	id: string;
	municipe?: string;
	rg?: string;
	cpf?: string;
	processo?: string;
	resumo?: string;
	motivoId?: string;
	coordenadoriaId?: string;
	tecnicoId?: string;
	importado: boolean;
	legado: boolean;
	dataInicio: Date;
	dataFim: Date;
	motivo?: IMotivo;
	coordenadoria?: ICoordenadoria;
	tecnico?: IUsuario;
	status?: IStatus;
}

export enum IStatus {
	AGENDADO,
	CANCELADO,
	CONCLUIDO,
}

export interface IPaginadoAgendamento {
	data: IAgendamento[];
	total: number;
	pagina: number;
	limite: number;
}

export interface ICreateParticipante {
	nome: string;
	email: string;
	cpf: string;
}

export interface ICreateAgendamento {
	participantes: ICreateParticipante[];
	processo: string;
	motivoId: string;
	coordenadoriaId: string;
	tecnicoId: string;
	dataInicio: Date;
	dataFim: Date;
	resumo?: string;
	status?: IStatus;
}

export interface IDashboardAgendamento {
	coordenadorias: IChart[];
	motivos: IChart[];
	total: number;
	totalMes: number;
	totalDia: number;
	totalAno: number;
	agendamentosMes: IChart[];
}

export interface IChart {
	label: string;
	value: number;
}

export interface IRespostaAgendamento {
	ok: boolean;
	error: string | null;
	data:
		| IAgendamento
		| IAgendamento[]
		| IPaginadoAgendamento
		| IDashboardAgendamento
		| null;
	status: number;
}

export interface IUpdateAgendamento {
	municipe?: string;
	rg?: string;
	cpf?: string;
	processo?: string;
	motivoId?: string;
	coordenadoriaId?: string;
	tecnicoId?: string;
	dataInicio?: Date;
	dataFim?: Date;
	resumo?: string;
	status?: IStatus;
}
