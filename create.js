const uuid = require("uuid/v4");
const { success, failure } = require("./libs/response-lib");
const dynamoDbLib = require("./libs/dynamodb-lib");

export const main = async (event, context, callback) => {
	const data = JSON.parse(event.body);
	const params = {
		TableName: "notes",
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid(),
			content: data.content,
			attachment: data.attachment,
			createdAt: Date.now()
		}
	};

	try {
		await dynamoDbLib.call("put", params);
		return success(params.Item);
	} catch (dynamo_db_error) {
		return failure({ status: JSON.stringify(dynamo_db_error) });
	}
};
