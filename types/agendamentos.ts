/** @format */

import { ICoordenadoria } from './coordenadoria';
import { IMotivo } from './motivos';
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
}

export interface IPaginadoAgendamento {
	data: IAgendamento[];
	total: number;
	pagina: number;
	limite: number;
}

export interface ICreateAgendamento {
	municipe: string;
	rg?: string;
	cpf?: string;
	processo: string;
	motivoId: string;
	coordenadoriaId: string;
	tecnicoId: string;
	dataInicio: Date;
	dataFim: Date;
}

export interface IRespostaAgendamento {
	ok: boolean;
	error: string | null;
	data: IAgendamento | IAgendamento[] | IPaginadoAgendamento | null;
	status: number;
}
