import mongoose from 'mongoose';


const issueSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
		default: null,
	},
	isFinished: {
		type: Boolean,
		required: false,
		default: false,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	columnId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	contributors: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: false,
		default: null,
	}],
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tag',
		required: false,
		default: null,
	}],
	messages: [{
		content: {
			type: String,
			required: false,
			default: null,
		},
		addTime: {
			type: Date,
			required: false,
			default: null,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tag',
			required: false,
			default: null,
		},
	}],
	steps: [{
		content: {
			type: String,
			required: false,
			default: null,
		},
		isCompleted: {
			type: Boolean,
			required: false,
			default: false,
		},
	}],
	attachments: [{
		name: {
			type: String,
			required: false,
			default: null,
		}
	}],
});


const Issue = mongoose.model('Issue', issueSchema);

export default Issue;