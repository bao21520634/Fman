import React from 'react';
import { Transition } from '@tailwindui/react';
import { Menu } from '@headlessui/react';

const AncestorDropdown = ({ show = false, children }) => {
    return (
        <>
            <Menu as="div" className="absolute inline-block text-left z-10">
                <Transition
                    show={show}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <div className="absolute py-1 left-0 mt-4 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {children}
                    </div>
                </Transition>
            </Menu>
        </>
    );
};

export default AncestorDropdown;
