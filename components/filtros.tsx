/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, RefreshCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { DatePickerWithRange } from './ui/date-range';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';
import { format } from 'path';
import { cn } from '@/lib/utils';

interface CampoFiltravel {
	nome: string;
	tag: string;
	tipo: TiposFiltros;
	valores?: CampoSelect[] | CampoDataRange
	placeholder?: string
}

export enum TiposFiltros {
	TEXTO,
	DATA,
	SELECT
}

interface CampoSelect {
	value: string | number;
	label: string;
}

interface CampoDataRange {
	nomeInicio: string;
	nomeFim: string;
}

interface FiltrosProps {
	camposFiltraveis?: CampoFiltravel[];
}

export function Filtros({ camposFiltraveis }: FiltrosProps) {
	console.log(camposFiltraveis);
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	
	const [isPending, startTransition] = useTransition();
	const [filtros, setFiltros] = useState<{ [key: string]: string }>(
		camposFiltraveis ? camposFiltraveis.reduce((acc, item) => ({ ...acc, [item.tag]: '' }), {}): {}
	);

	useEffect(() => {
		for (const [key, value] of searchParams) {
			setFiltros((prev) => ({
				...prev,
				[key]: value,
			}));
		}
	}, []);

	function handleClick() {
		let urlParams = '';
		for (const [key, value] of Object.entries(filtros)) {
			urlParams += `${key}=${value}&`;
		}
		router.push(`${pathname}?${urlParams}`);
	}

	function renderFiltros() {
		const filtros = [];
		if (camposFiltraveis) {
		  for (const campo of camposFiltraveis) {
			switch (campo.tipo) {
			  case TiposFiltros.TEXTO:
				filtros.push(renderTexto(campo));
				break;
			  case TiposFiltros.DATA:
				filtros.push(renderData(campo));
				break;
			  case TiposFiltros.SELECT:
				filtros.push(renderSelect(campo));
				break;
			}
		  }
		}
		return filtros;
	  }

	function renderTexto(campo: CampoFiltravel) {
		return <div className='flex flex-col w-full md:w-60' key={campo.tag}>
			<p>{campo.nome}</p>
			<Input
				value={filtros[campo.tag]}
				onChange={(e) => setFiltros((prev) => ({ ...prev, [campo.tag]: e.target.value }))}
				className='bg-background'
				placeholder={campo.placeholder}
			/>
		</div>
	}

	function renderSelect(campo: CampoFiltravel) {
		return <div className='flex flex-col w-full md:w-60' key={campo.tag}>
			<p>{campo.nome}</p>
			<Select
				onValueChange={(value) => setFiltros((prev) => ({ ...prev, [campo.tag]: value }))}
				defaultValue={filtros[campo.tag]}>
				<SelectTrigger className='w-full md:w-60 text-nowrap bg-background'>
					<SelectValue placeholder={campo.placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem
						value='all'
						className='text-nowrap'>
						Tudo
					</SelectItem>
					{campo.valores && (campo.valores as CampoSelect[]).map((item) => {
						return (
							<SelectItem
								key={item.value}
								value={item.value.toString()}>
								{item.label}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	}

	function renderData(campo: CampoFiltravel) {
		return null;
	}

	return (
		<div className='flex flex-col md:flex-row md:items-end gap-5 md:w-fit justify-start'>
			{renderFiltros()}
			<Button className='w-full md:w-fit' onClick={() => startTransition(() => handleClick())}>
				Atualizar <RefreshCw className={isPending ? 'animate-spin' : ''} />
			</Button>
		</div>
	);
}
