/** @format */

import { IAgendamento } from '@/types/agendamentos';
import { ICoordenadoria } from '@/types/coordenadoria';
import { IMotivo } from '@/types/motivos';
import { IPermissao, IUsuario } from '@/types/usuario';

export const data: IAgendamento[] = Array.from({ length: 30 }, (_, index) => {
	const idx = index + 1;
	const now = new Date();

	// Datas para os agendamentos
	const dataInicio = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		8,
		0,
		0,
	);
	const dataFim = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		10,
		0,
		0,
	);

	// Exemplo de Coordenadoria
	const coordenadoria: ICoordenadoria = {
		id: `coordenadoria-${idx}`,
		sigla: `COORD${idx}`,
		status: idx % 2 === 0,
		criadoEm: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
		atualizadoEm: now,
	};

	// Exemplo de Motivo
	const motivo: IMotivo = {
		id: `motivo-${idx}`,
		texto: `Motivo de agendamento ${idx}`,
		status: idx % 2 === 0,
		criadoEm: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
		atualizadoEm: now,
	};

	// Seleciona um valor do enum IPermissao com base no índice
	const permissoes = [
		IPermissao.DEV,
		IPermissao.TEC,
		IPermissao.ADM,
		IPermissao.USR,
	];
	const permissaoSelecionada = permissoes[idx % permissoes.length];

	// Exemplo de Técnico (usuário)
	const tecnico: IUsuario = {
		id: `tecnico-${idx}`,
		nome: `Técnico ${idx}`,
		login: `tecnico${idx}`,
		email: `tecnico${idx}@exemplo.com`,
		permissao: permissaoSelecionada,
		avatar: `https://exemplo.com/avatar${idx}.png`,
		status: true,
		ultimoLogin: now,
		criadoEm: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 20),
		atualizadoEm: now,
	};

	return {
		id: `agendamento-${idx}`,
		municipe: `Munícipe ${idx}`,
		rg: `RG-${1000 + idx}`,
		cpf: `CPF-${10000000000 + idx}`,
		processo: `Processo-${idx}`,
		resumo: `Resumo do agendamento ${idx}`,
		motivoId: motivo.id,
		coordenadoriaId: coordenadoria.id,
		tecnicoId: tecnico.id,
		importado: idx % 2 === 0,
		legado: idx % 3 === 0,
		dataInicio,
		dataFim,
		motivo,
		coordenadoria,
		tecnico,
	};
});
