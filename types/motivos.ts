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
