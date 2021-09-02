import asyncHandler from 'express-async-handler';
import fs from 'fs';
import multer from 'multer';


export const uploadImage = asyncHandler(async(req, res) => {
	try {
		res.json(req.file.path);
	} catch (err) {
		console.log(err);
		res.status(400);
	}
});


export const deleteImage = asyncHandler(async(req, res) => {
	const id = req.params.columnId;

	const update = { 
		  $set: {
				name: req.body.name,
		  } 
	};

	const options =  {
		  new: true, 
		  useFindAndModify: false,
	};

	try {
		  const updatedColumn = await Column.findByIdAndUpdate(id, update, options);
		  res.json(updatedColumn);
	} catch(err) {
		  res.status(400).json({message: "Update of column unsuccessfull"});
		  throw new Error('Update of column unsuccessfull');
	}
});


export function setupDiskStorage() {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = `uploads/organization-${req.body.organizationId}/${req.body.directory}`
	
			fs.access(dir, function (error) {
				if (error) {
					// no such directory, creates it
					return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
				} else {
					// directory exists
					return cb(null, dir);
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
			fileSize: 1024 * 1024 * 5,
		},
		fileFilter: (req, file, cb) => {
			if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
				return cb(new Error('File extension must be .jpg or .jpeg'));
			}
			cb(null, true);
		},
	});

	return upload;
}