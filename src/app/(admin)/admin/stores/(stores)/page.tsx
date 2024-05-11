import AdminSection from '@/components/shells/admin-section';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { getAllStores } from '@/actions/store';
import CreateStore from '../../_components/create-store';


const page = async () => {
  const { userId } = auth();
  const { data } = await getAllStores();

  return (
    <AdminSection
      title='Stores'
      subtitle='Manage your stores'
    >
      <CreateStore userId={userId!} />
      {JSON.stringify(data)}
    </AdminSection>
  )
}

export default page
