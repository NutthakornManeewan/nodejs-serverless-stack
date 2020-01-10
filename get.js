const dynamoDbLib = require("./libs/dynamodb-lib");
const { success, failure } = require("./libs/response-lib");

export const main = async (event, context) => {
	const { requestContext, pathParameters } = event;
	const params = {
		TableName: "notes",
		Key: {
			userId: requestContext.identity.cognitoIdentityId,
			noteId: pathParameters.id
		}
	};

	try {
		const result = await dynamoDbLib.call("get", params);
		if (!!result.Item) {
			return success(result.Item);
		}
		return failure({ status: false, error: "Item not found!" });
	} catch (get_error) {
		return failure({ status: JSON.stringify(get_error) });
	}
};
