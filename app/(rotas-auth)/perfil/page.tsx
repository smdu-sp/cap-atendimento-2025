/** @format */

'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Perfil() {
	const { data: session } = useSession();
	return (
		<div>
			<h1 className='font-bold text-4xl'>Perfil</h1>
			<Avatar className='h-40 w-40 '>
				<AvatarImage
					src={session?.usuario.avatar}
					alt='name'></AvatarImage>
			</Avatar>
		</div>
	);
}
