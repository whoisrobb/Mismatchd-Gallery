import AdminSection from '@/components/shells/admin-section'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <AdminSection
        title='Account'
        subtitle='Manage your account settings'
    >
      <UserProfile />
    </AdminSection>
  )
}

export default page
