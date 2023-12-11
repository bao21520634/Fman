import React, { useEffect, useRef, useState } from 'react';
import TextInput from '@/Components/TextInput.jsx';
import { router } from '@inertiajs/react';

const SearchForm = () => {
    const search = useRef('');

    const [isFocused, setIsFocused] = useState(false);

    const [params, setParams] = useState(new URLSearchParams(window.location.search));

    useEffect(() => {
        search.current.value = params.get('search');
    }, [params]);

    const onSearch = (e) => {
        e.preventDefault();

        if (e.key === 'Enter') {
            params.set('search', search.current.value);
            router.get(window.location.pathname + '?' + params.toString());
        }
    };

    return (
        <div
            className={`w-fit h-fit my-4 flex items-center rounded-full overflow-hidden ${
                isFocused ? 'shadow-md' : 'shadow-sm'
            }`}
        >
            <div>
                <TextInput
                    type="text"
                    className=" border-none placeholder-stone-600 h-[48px] w-[640px] pl-6 focus:ring-0"
                    ref={search}
                    autoComplete="true"
                    placeholder="Search for files and folders"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyUp={(e) => onSearch(e)}
                />
            </div>
        </div>
    );
};

export default SearchForm;
