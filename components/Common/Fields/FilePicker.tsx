import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import { IconPhoto, IconTrash } from "@/components/Icons";
import { FC } from "react";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import IconBrokenFile from "@/components/Icons/IconBrokenFile";

interface FilePickerProps {
  name: string;
  label?: string;
  files: PreviewFile[];
  setFiles: (files: PreviewFile[]) => void;
  hasError: string;
}

interface PreviewFile extends File {
  preview: string;
  photo: string;
}

const compressImage = async (file: File) => {
  const options = {
    maxSizeKB: 500, // Max size for the image in KB
    maxWidthOrHeight: 1920, // Max width/height
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    throw error;
  }
};

const FilePicker: FC<FilePickerProps> = ({
  name,
  label,
  files,
  setFiles,
  hasError,
}) => {
  const uploadedFiles = Array.isArray(files) ? files : [];

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
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

      setFiles([...uploadedFiles, ...previewFiles]);
    },
  });

  const removeFile = (indexToRemove: number) => {
    setFiles(uploadedFiles.filter((_, i) => i !== indexToRemove));
  };

  const filePreviews = uploadedFiles?.length ? (
    uploadedFiles?.map((uploadedFile, fileIndex) => (
      <div
        className="border items-center rounded relative w-full"
        key={`img_${fileIndex}`}
      >
        {(uploadedFile?.photo?.startsWith("http://") ||
          uploadedFile?.photo?.startsWith("https://") ||
          uploadedFile?.photo?.startsWith("data:image") ||
          uploadedFile?.preview) &&
        (uploadedFile?.photo || uploadedFile?.preview) ? (
          <>
            <Image
              src={uploadedFile.photo || uploadedFile.preview}
              className="w-full aspect-square object-cover rounded-sm"
              alt={`img_${fileIndex}`}
              onLoad={() => URL.revokeObjectURL(uploadedFile.preview)}
              width={420}
              height={420}
            />
            <button
              onClick={() => removeFile(fileIndex)}
              title="Remove file"
              className="ml-auto hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center absolute bottom-2 right-2 bg-white/50"
            >
              <IconTrash className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="border items-center rounded relative w-full aspect-square bg-neutral-50 flex items-center justify-center">
            <IconBrokenFile className="text-neutral-500" />
            <button
              onClick={() => removeFile(fileIndex)}
              title="Remove file"
              className="ml-auto hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center absolute bottom-2 right-2 bg-white/50"
            >
              <IconTrash className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    ))
  ) : (
    <></>
  );

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`mt-2 flex justify-center rounded-lg border border-dashed cursor-pointer px-6 py-10 ${hasError ? "border-red-500" : "border-gray-900/25"}`}
      >
        <div className="text-center">
          <IconPhoto
            aria-hidden="true"
            className="mx-auto h-7 w-7 text-gray-300"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
              <span>Upload files</span>
              <input id={name} name={name} {...getInputProps()} />
              <br />
              {hasError && <span className="text-red-500">{hasError}</span>}
            </div>
          </div>
        </div>
      </div>

      <aside className="grid grid-cols-7 mt-4 gap-1">{filePreviews}</aside>
    </div>
  );
};

export default FilePicker;
