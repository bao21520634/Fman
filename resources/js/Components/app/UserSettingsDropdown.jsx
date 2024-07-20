import React from 'react';
import { Transition } from '@tailwindui/react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';

const UserSettingsDropdown = () => {
    const { auth } = usePage().props;
    const active = false;

    return (
        <Menu as="div" className="relative inline-block text-left z-50">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {auth.user.name}

                    <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-800" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                show={true}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            <ResponsiveNavLink
                                href={route('profile.edit')}
                                className={
                                    (active ? 'bg-gray-100 text-gray-900' : 'text-gray-700') + 'block px-4 py-2 text-sm'
                                }
                            >
                                Profile
                            </ResponsiveNavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <ResponsiveNavLink
                                href={route('logout')}
                                method="post"
                                as="button"
                                className={
                                    (active ? 'bg-gray-100 text-gray-900' : 'text-gray-700') + 'block px-4 py-2 text-sm'
                                }
                            >
                                Logout
                            </ResponsiveNavLink>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default UserSettingsDropdown;
