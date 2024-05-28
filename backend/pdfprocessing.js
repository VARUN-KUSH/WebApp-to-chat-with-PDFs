import fs from "fs";
import PDFParser from "pdf2json";

const pdfParser = new PDFParser(this, 1);

function pdfprocessing(filepath) {
  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData) => {
      console.error(errData.parserError);
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const rawTextContent = pdfParser.getRawTextContent();
      const outputPath = "./public/temp/content.txt";
      fs.writeFile(
        outputPath, rawTextContent,
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            reject(err);
          } else {
            console.log("Text file created successfully:", outputPath);
            resolve(rawTextContent);
          
          }
          console.log("Done.");
      
      });
    });

    const textvalue = pdfParser.loadPDF(filepath);
  });
}
export { pdfprocessing };
