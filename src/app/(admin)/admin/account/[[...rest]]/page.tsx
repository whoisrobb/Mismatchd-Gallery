import ContentShell from '@/components/shells/content-shell';
import { UserProfile } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <ContentShell
        title='Account'
        subtitle='Manage your account settings'
    >
      <UserProfile />
    </ContentShell>
  )
}

export default page
