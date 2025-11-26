// app/admin/page.tsx (VERSÃO CORRIGIDA)
"use client";

import { LoginForm } from '@/components/login-form';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}