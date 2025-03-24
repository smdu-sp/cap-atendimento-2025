/** @format */

'use client';

import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function BtnSignOut() {
	return (
		<Button
			variant={'ghost'}
			className='w-full hover:text-destructive text-destructive flex items-center justify-center'
			onClick={async () => {
				await signOut({ redirect: true, redirectTo: '/login' });
			}}>
			<LogOut className='text-destructive' /> Sair
		</Button>
	);
}
