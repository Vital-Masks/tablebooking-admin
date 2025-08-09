import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import { IconPhoto, IconTrash } from "@/components/Icons";
import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import IconBrokenFile from "@/components/Icons/IconBrokenFile";

interface FilePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  accept?: any;
  maxFiles: number;
  files: PreviewFile[];
  setFiles: (files: PreviewFile[]) => void;
  hasError: string;
}

interface PreviewFile extends File {
  preview: any;
  photo: string;
}

const FilePicker: FC<FilePickerProps> = ({
  name,
  label,
  placeholder,
  accept,
  maxFiles,
  files,
  setFiles,
  hasError,
}) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const uploadedFiles = useMemo(() => {
    return Array.isArray(files) ? files : files ? [files] : [];
  }, [files]);

  // Cleanup object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [uploadedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept ?? { "image/*": [] },
    maxFiles: maxFiles ?? 1,
    onDrop: async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const previewFiles = acceptedFiles.map((file) => ({
        preview: file,
      })) as PreviewFile[];

      if (maxFiles > 1) {
        setFiles([...uploadedFiles, ...previewFiles]);
      } else {
        setFiles([...previewFiles]);
      }
    },
  });

  const removeFile = (indexToRemove: number) => {
    const fileToRemove = uploadedFiles[indexToRemove];
    if (fileToRemove.preview && fileToRemove.preview.startsWith("blob:")) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFiles(uploadedFiles.filter((_, i) => i !== indexToRemove));
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };



  const filePreviews = uploadedFiles?.length ? (
    uploadedFiles?.map((uploadedFile, fileIndex) => {
      const imageUrl = uploadedFile?.photo || uploadedFile?.preview;
      const hasError = imageErrors.has(imageUrl);
      
      return (
        <div
          className="border items-center rounded relative w-full"
          key={`img_${fileIndex}`}
        >
          {(uploadedFile?.photo?.startsWith("https://") ||
            uploadedFile?.preview) &&
          (uploadedFile?.photo || uploadedFile?.preview) && !hasError ? (
            <>
              <Image
                src={uploadedFile.photo || URL.createObjectURL(uploadedFile.preview)}
                className="w-full aspect-square object-cover rounded-sm border rounded relative w-full aspect-square bg-neutral-50 flex items-center justify-center"
                alt={`img_${fileIndex}`}
                width={420}
                height={420}
                onError={() => handleImageError(imageUrl)}
                unoptimized={uploadedFile.photo?.startsWith("https://")}
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
            <div className="border rounded relative w-full aspect-square bg-neutral-50 flex items-center justify-center">
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
      );
    })
  ) : (
    <></>
  );


  return (
    <div>
      {uploadedFiles.length < 5 && (
        <>
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
                  <span>{placeholder ?? "Upload files"}</span>
                  <input id={name} name={name} {...getInputProps()} />
                  <br />
                  {hasError && <span className="text-red-500">{hasError}</span>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <aside
        className={`grid mt-4 gap-1 ${maxFiles > 1 ? "grid-cols-7" : "grid-cols-1"}`}
      >
        {filePreviews}
      </aside>
    </div>
  );
};

export default FilePicker;
