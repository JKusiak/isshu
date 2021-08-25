import mongoose from 'mongoose';


const organizationSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	archivedIssues: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Issue',           
		required: false,
		default: null,
	}
});


const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;