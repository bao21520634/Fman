import React, { useState, useEffect } from 'react';
import { Transition } from '@tailwindui/react';
import { SHOW_NOTIFICATION, emitter } from '@/event-bus';

const Notification = () => {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('success');
    const [message, setMessage] = useState('');

    const close = () => {
        setShow(false);
        setType('');
        setMessage('');
    };

    useEffect(() => {
        let timeout;

        emitter.on(SHOW_NOTIFICATION, ({ type: t, message: m }) => {
            setShow(true);
            setType(t);
            setMessage(m);

            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                close();
            }, 5000);
        });
    });

    return (
        <div>
            <Transition
                show={show}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div
                    className={`fixed bottom-4 left-3 text-white py-2 px-4 rounded-sm shadow-md w-[220px] select-none ${
                        type === 'success' && 'bg-black'
                    }  ${type === 'error' && 'bg-red-50'}`}
                >
                    {message}
                </div>
            </Transition>
        </div>
    );
};

export default Notification;
