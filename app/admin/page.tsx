"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && (!session || !['admin', 'moderator'].includes(session.user.role))) {
        router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') return null;
  if (!session || !['admin', 'moderator'].includes(session.user.role)) return <p>У вас нет доступа к этой странице</p>;


  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Админ Панель</h1>
      <div className="border p-4 rounded space-y-2">
        <Link
          href="/admin/users"
          className="block bg-blue-500 text-white text-center p-2 rounded"
        >
          Управление участниками
        </Link>
        <Link
          href="/admin/add-product"
          className="block bg-green-500 text-white text-center p-2 rounded"
        >
          Добавление товара
        </Link>
        <Link
          href="/admin/edit-product"
          className="block bg-yellow-500 text-white text-center p-2 rounded"
        >
          Просмотр и редактирование товара
        </Link>
        <Link
          href="/admin/orders"
          className="block bg-indigo-700 text-white text-center p-2 rounded"
        >
          Просмотр заказов
        </Link>
        <Link
          href="/profile"
          className="block bg-gray-500 text-white text-center p-2 rounded"
        >
          Назад
        </Link>
      </div>
    </div>
  );
}
