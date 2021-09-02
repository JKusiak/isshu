import fs from 'fs';
import multer from 'multer';


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = `../uploads/organization-${req.body.organizationId}/${req.body.directory}`;

		fs.access(dir, function (error) {
			if (error) {
				// no such directory, creates it
				return fs.mkdir(dest, (error) => cb(error, dest));
			} else {
				// directory exists
				return cb(null, dest);
			}
		});
	},
	filename: (req, file, cb) => {
		cb(null, `${req.params.imageId}.jpg`);
	}
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg)$/)){
			cb(new Error('File extension must be .jpg or .jpeg'));
			console.log('error file type');
		}
	}	
});

const uploadFile = upload.single('imageUpload');