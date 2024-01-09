import NewUserForm from '@/components/user/NewUserForm';
import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '@/helper/authOptions';

const RegisterPage = async() => {

    const session = await getServerSession(authOptions);
    if (session) {
      redirect("/");
    }

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-12 lg:col-span-8'></div>
            <div className='col-span-12 lg:col-span-4'><NewUserForm /></div>
        </div>
    );
};

export default RegisterPage;