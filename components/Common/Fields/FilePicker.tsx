import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { IconPhoto, IconTrash } from '@/components/Icons';
import { FC } from 'react';
import Image from 'next/image';

interface FilePickerProps {
  name: string;
  label: string;
  files: PreviewFile[];
  setFiles: (files: PreviewFile[]) => void;
}

interface PreviewFile extends File {
  preview: string;
}

const FilePicker: FC<FilePickerProps> = ({ name, label, files, setFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      const previewFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as PreviewFile[];
      setFiles(previewFiles);
    },
  });

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const thumbs = files.map((file) => (
    <div className="w-full border flex items-center gap-2 justify-between" key={file.name}>
      <div>
        <Image
          src={file.photo || file.preview}
          className="h-22 w-auto max-w-32 object-cover"
          alt={file.name}
          onLoad={() => URL.revokeObjectURL(file.preview)}
          width={420}
          height={420}
        />
      </div>
      <button
        onClick={() => removeFile(file.name)}
        title="Remove file"
        className="mr-2 hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
      >
        <IconTrash className="w-4 h-4" />
      </button>
    </div>
  ));

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div {...getRootProps({ className: 'dropzone' })} className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <IconPhoto aria-hidden="true" className="mx-auto h-7 w-7 text-gray-300" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input id={name} name={name} {...getInputProps()} />
            </label>
          </div>
        </div>
      </div>
      <aside className="flex flex-col mt-4 gap-4">{thumbs}</aside>
    </div>
  );
};

export default FilePicker;
