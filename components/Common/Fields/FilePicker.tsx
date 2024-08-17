import { IconPhoto } from '@/components/Icons'
import React from 'react'

const FilePicker = ({name, label}: any) => {
    return (
        <div>
            <label
                htmlFor={label}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <IconPhoto
                        aria-hidden="true"
                        className="mx-auto h-7 w-7 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor={name}
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Upload a file</span>
                            <input
                                id={name}
                                name={name}
                                type="file"
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilePicker