/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

interface CampoFiltravel {
	nome: string;
	tipo: Tipos;
	valores: CampoSelect[] | CampoDataRange
}

enum Tipos {
	TEXTO,
	DATA,
	DATARANGE,
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
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	
	const [isPending, startTransition] = useTransition();
	const [filtros, setFiltros] = useState(
		searchParams.forEach((value, key) => {
			return [key] = value;
		})
	);

	useEffect(() => {
		console.log(filtros);
	}, [filtros]);

	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='flex flex-col md:flex-row md:items-end flex-wrap gap-5 w-full'>
				<Button className='w-full md:w-fit'>
					Atualizar <RefreshCw />
				</Button>
			</div>
		</div>
	);
}
