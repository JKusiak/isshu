import asyncHandler from 'express-async-handler';
import fs from 'fs';
import multer from 'multer';


export const checkIfExsists = asyncHandler(async (req, res) => {
	fs.access(req.params.path, function (error) {
		if(error) {
			res.json(false);
		} else {
			res.json(true);
		}
	})
});


export const uploadImage = asyncHandler(async (req, res) => {
	try {
		res.json(req.file.path);
	} catch (err) {
		console.log(err);
		res.status(400);
	}
});

export const deleteImage = asyncHandler(async (req, res) => {
	fs.unlink(req.params.path, function (error) {
		if(error) {
			console.log(err);
		} else {
			res.json('Deleted');
			console.log(`Deleted from ${req.params.path}`);
		}
	})
});


export function setupDiskStorage() {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = `uploads/organization-${req.body.organizationId}/${req.body.directory}`

			fs.access(dir, function (error) {
				if (error) {
					// no such directory, creates it
					return fs.mkdir(dir, {
						recursive: true
					}, (error) => cb(error, dir));
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