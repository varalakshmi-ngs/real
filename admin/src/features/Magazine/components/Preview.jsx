import React, { useState } from "react";

import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ preview }) {
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <div className="p-4 rounded-lg w-full overflow-y-scroll space-y-2">
      {preview && (
        <div
          className="w-full flex items-center flex-col space-y-2 justify-center p-4"
          ref={(el) => {
            if (el) setContainerWidth(el.offsetWidth);
          }}
        >
          <Document file={preview} renderMode="canvas" className={"bg-red-500"}>
            <Page
              width={containerWidth * 0.7} // 50% of container width
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      )}
    </div>
  );
}
