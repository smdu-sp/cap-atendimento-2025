/** @format */

import { IProcesso } from '@/types/processo';

export const data: IProcesso[] = [
	{
		municipe: 'João da Silva',
		tecnico: 'Maria Oliveira',
		processo: '12345/2024',
		coordenadoria: 'Urbanismo',
		datainicio: new Date('2024-01-15'),
		datafim: new Date('2024-02-10'),
		motivo: 'Regularização fundiária',
		rg: '123456789',
		cpf: '111.222.333-44',
	},
	{
		municipe: 'Ana Souza',
		tecnico: 'Carlos Pereira',
		processo: '67890/2024',
		coordenadoria: 'Meio Ambiente',
		datainicio: new Date('2024-02-05'),
		datafim: new Date('2024-03-20'),
		motivo: 'Licenciamento ambiental',
		rg: '987654321',
		cpf: '555.666.777-88',
	},
	// Gerando mais 28 itens...
	...Array.from({ length: 28 }, (_, i) => ({
		municipe: `Munícipe ${i + 3}`,
		tecnico: `Técnico ${i + 3}`,
		processo: `${10000 + i}/2024`,
		coordenadoria: ['Urbanismo', 'Meio Ambiente', 'Saúde', 'Educação'][i % 4],
		datainicio: new Date(2024, i % 12, (i % 28) + 1),
		datafim: new Date(2024, (i + 2) % 12, ((i + 10) % 28) + 1),
		motivo: `Motivo ${i + 3}`,
		rg: `${100000000 + i}`,
		cpf: `${900000000 + i}`.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-00'),
	})),
];
