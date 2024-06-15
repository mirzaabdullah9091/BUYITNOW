import multer from "multer";
import path from "path";

// Configure storage options for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Destination function called");
        cb(null, "public/uploads"); // Set the destination for uploaded files
    },
    filename: function (req, file, cb) {
        const timestampedFilename = new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname;
        console.log(`Uploading file: ${timestampedFilename}`); // Log the filename
        cb(null, timestampedFilename); // Set the filename with a timestamp
    }
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
    console.log(`File filter called: ${file.mimetype}`); // Log the file type
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true); // Accept the file
    } else {
        console.log('Unsupported file format. Upload only JPEG/JPG or PNG');
        cb(new Error('Unsupported file format. Upload only JPEG/JPG or PNG'), false); // Reject the file
    }
};

// Multer configuration
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
    fileFilter
});

export default upload;
