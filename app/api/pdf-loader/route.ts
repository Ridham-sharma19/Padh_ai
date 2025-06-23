import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";


export async function GET(request: Request) { 
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get('pdfUrl');

  
  if (!pdfUrl) {
    return NextResponse.json(
      { error: "pdfUrl query parameter is missing" },
      { status: 400 } 
    );
  }

  try {
    const response = await fetch(pdfUrl);

   
    if (!response.ok) {
   
      const errorText = await response.text();
      console.error(`Failed to fetch PDF from ${pdfUrl}: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Failed to fetch PDF: ${response.statusText}` },
        { status: response.status } 
      );
    }

    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load(); 

    let pdfTextContent = '';
    docs.forEach(doc => {
      
      pdfTextContent += doc.pageContent as string;
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 40,
    });

 
    const output = await splitter.createDocuments([pdfTextContent]);
    
    
    const splitterList: string[] = output.map(doc => doc.pageContent);

    return NextResponse.json({ result: splitterList });

  } catch (error) {
    console.error("Error processing PDF in API route:", error);
    
    return NextResponse.json(
      { error: "Internal Server Error during PDF processing" },
      { status: 500 }
    );
  }
}