const axios = require('axios');

exports.handler = async (event, context) => {
    console.log("Received event:", JSON.stringify(event, null, 2));

    // Parse GitHub issue details from the incoming event
    const body = JSON.parse(event.body);
    const issueUrl = body.issue?.html_url;

  
    try {
        const response = await axios.post(process.env.SLACK_URL, {
            text: `Issue Created: ${issueUrl}`
        }, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Message posted to Slack:", response.data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Slack notification sent" })
        };
    } catch (error) {
        console.error("Failed to send message to Slack:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send Slack notification" })
        };
    }
};
