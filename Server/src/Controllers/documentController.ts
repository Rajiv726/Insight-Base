import { Request, Response } from "express";
import documentModel from "../Models/documentModel";
import { Roles } from "../Constants/Roles"; // Adjust the path as needed

// Create a new document
export const createDocument = async ( 
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const document = new documentModel({
      title: req.body.title,
      content: req.body.content,
      author: req.user!._id,
    });
    await document.save();
    res
      .status(201)
      .json({ message: "Document created successfully", document });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all documents
export const getAllDocuments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const documents = await documentModel.find();
    res
      .status(200)
      .json({ message: "Documents retrieved successfully", documents });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a document by ID
export const getDocumentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const document = await documentModel.findById(req.params.id);
    if (!document) {
      res.status(404).json({ message: "Document not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Document retrieved successfully", document });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a document
export const updateDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const document = await documentModel.findById(req.params.id);
    if (!document) {
      res.status(404).json({ message: "Document not found" });
      return;
    }
    if (
      document.author.toString() !== req.user!._id.toString() &&
      req.user!.role !== Roles.ADMIN
    ) {
      res.status(403).json({ message: "Forbidden: Not the author or admin" });
      return;
    }
    document.title = req.body.title ?? document.title;
    document.content = req.body.content ?? document.content;
    await document.save();
    res
      .status(200)
      .json({ message: "Document updated successfully", document });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a document
export const deleteDocument = async(req: Request, res:Response):Promise<void>=>{
    try{
        const document = await documentModel.findById(req.params.id)
        if(!document){
            res.status(404).json({message:"Document not found.!"})
            return
        }
        if(document.author.toString() !== req.user!._id.toString() && req.user!.role !== Roles.ADMIN){
            res.status(403).json({message:"Forbidden: Not the author or admin"})
            return
        }
        await documentModel.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: "Document deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}