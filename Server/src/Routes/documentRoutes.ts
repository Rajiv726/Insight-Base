import express from 'express'
import { createDocument, deleteDocument, getAllDocuments, getDocumentById, updateDocument } from '../Controllers/documentController';
import { protect } from '../Middlewares/authMiddleware';

const router = express.Router();

router.post('/',protect, createDocument);
router.get('/', protect, getAllDocuments);
router.get('/:id', protect, getDocumentById);
router.put('/:id', protect, updateDocument);
router.delete('/:id', protect, deleteDocument);

export default router;