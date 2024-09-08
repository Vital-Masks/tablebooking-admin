import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { IconPhoto, IconTrash } from '@/components/Icons';
import { FC } from 'react';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

interface FilePickerProps {
  name: string;
  label: string;
  files: PreviewFile[];
  setFiles: (files: PreviewFile[]) => void;
}

interface PreviewFile extends File {
  preview: string;
  photo: string;
}

const FilePicker: FC<FilePickerProps> = ({ name, label, files, setFiles }) => {
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1, // Max size for the image in MB
      maxWidthOrHeight: 1920, // Max width/height
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      throw error;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 5,
    onDrop: async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const compressedFiles = await Promise.all(
        acceptedFiles.map((file) => compressImage(file))
      );

      const previewFiles = compressedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as PreviewFile[];

      setFiles([...files, ...previewFiles]);
    },
  });

  const removeFile = (fileIndex: number) => {
    setFiles(files.filter((_, i) => i !== fileIndex));
  };

  const thumbs = files.map((file, i) => (
    <div
      className="w-full border flex items-center gap-2 justify-between"
      key={`img_${i}`}
    >
      <div>
        {(file.photo || file.preview) && (
          <Image
            src={file.photo || file.preview}
            className="h-32 w-auto max-w-32 object-contain"
            alt={`img_${i}`}
            onLoad={() => URL.revokeObjectURL(file.preview)}
            width={420}
            height={420}
          />
        )}
      </div>
      <button
        onClick={() => removeFile(i)}
        title="Remove file"
        className="mr-2 hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center"
      >
        <IconTrash className="w-4 h-4" />
      </button>
    </div>
  ));

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
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
