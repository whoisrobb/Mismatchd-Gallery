"use client";

import React from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'

const SignInButton = () => {
  return (
    <div>
        <Button
            onClick={() => toast.info("Hey there👋. Test Email: test@example.com, Password: password1")}
        >
            Sign in
        </Button>
    </div>
  )
}

export default SignInButton
