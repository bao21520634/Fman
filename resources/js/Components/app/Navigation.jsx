import React from 'react';
import { Link, usePage } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo.jsx';
import CreateNewDropdown from './CreateNewDropdown.jsx';
import NavLink from '@/Components/NavLink.jsx';

const Navigation = () => {
    const url = usePage().url;

    return (
        <nav className="min-w-[220px]">
            <Link href={route('myFiles')}>
                <div className="h-[80px] px-3 flex items-center gap-3">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    Fman
                </div>
            </Link>

            <div className="px-3">
                <CreateNewDropdown />

                <div className="py-3">
                    <NavLink href={route('myFiles')} active={url === '/my-files'}>
                        My Files
                    </NavLink>
                    <NavLink href={route('sharedWithMe')} active={url === '/shared-with-me'}>
                        Shared with me
                    </NavLink>
                    <NavLink href={route('sharedByMe')} active={url === '/shared-by-me'}>
                        Shared by me
                    </NavLink>
                    <NavLink href={route('starred')} active={url === '/starred'}>
                        Starred
                    </NavLink>
                    <NavLink href={route('trash')} active={url === '/trash'}>
                        Trash
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
