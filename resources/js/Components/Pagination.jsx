
import React from 'react';
import NavLink from "@/Components/NavLink";

export default function Pagination({ data }) {

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {data.total > 0 && data.links.map(link => (
                            <NavLink
                                key={link.label}
                                href={link.url}
                                active={link.active}>
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );

}