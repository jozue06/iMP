import { Schema } from "mongoose";

const TaskSchema = new Schema({

	date: {
		type: Date,
		required: true,
		default: new Date(),
	},

	type: {
		type: Number,
		required: true
	},

	details: {
		type: String,
		required: false
	},

	completed: {
		type: Boolean,
		required: false
	},

	contactId: {
		type: Number,
		required: true
	}
});

export default TaskSchema;