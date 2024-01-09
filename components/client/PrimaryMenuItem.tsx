import Link from 'next/link';
import React from 'react';

const PrimaryMenuItem = ({menuItem} : {menuItem: IPrimaryNavigation}) => {
    return (
        <Link className="font-bold text-lg py-5 hover:text-primary" href={menuItem?.link}>
            {
                menuItem?.label
            }
        </Link>
    );
};

export default PrimaryMenuItem;