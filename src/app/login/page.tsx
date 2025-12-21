'use client';

import { Suspense } from 'react'
import SignInPage from '@/containers/login-page'

export default function LoginPage() {

  return (
   <Suspense fallback={<div>Loading...</div>}>
		 <SignInPage/>
	 </Suspense>
  );
}

