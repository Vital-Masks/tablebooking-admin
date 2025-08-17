'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import { IconCaretDown } from '../Icons';

// Set the workerSrc path
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PdfRendererProps {
  base64String: string;
}

const PdfRenderer: React.FC<PdfRendererProps> = ({ base64String }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const cleanBase64String = base64String
          .replace(/^data:application\/pdf;base64,/, '')
          .replace(/[\r\n]+/g, '');

        const binaryData = Uint8Array.from(atob(cleanBase64String), (char) =>
          char.charCodeAt(0)
        );

        const loadingTask = pdfjsLib.getDocument({ data: binaryData });
        const loadedPdf = await loadingTask.promise;

        setPdf(loadedPdf);
        setTotalPages(loadedPdf.numPages);

        // Render the first page
        renderPage(1, loadedPdf);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [base64String]);

  const renderPage = async (
    pageNumber: number,
    loadedPdf: pdfjsLib.PDFDocumentProxy
  ) => {
    try {
      const page = await loadedPdf.getPage(pageNumber);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const context = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  const handlePreviousPage = () => {
    if (pdf && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      renderPage(newPage, pdf);
    }
  };

  const handleNextPage = () => {
    if (pdf && currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      renderPage(newPage, pdf);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-2 space-x-4 ml-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-2 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          <IconCaretDown className="w-5 h-5 rotate-90" />
        </button>
        <span className="text-sm shrink-0">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          <IconCaretDown className="w-5 h-5 -rotate-90" />
        </button>
      </div>
      <canvas className="border mx-auto w-full" ref={canvasRef}></canvas>
    </div>
  );
};

export default PdfRenderer;
