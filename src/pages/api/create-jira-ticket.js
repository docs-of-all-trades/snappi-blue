export default async function POST(req, res) {
  try {
    console.log(req.body)
    const { firstName, lastName, email, category, message } = req.body
    const apiUrl = 'https://snappi-bank.atlassian.net/rest/api/2/issue'
    const projectKey = 'PSB'
    const issueType = 'PS PSD2 Developer Banking Solution Incident'
    const apiToken = process.env.JIRA_API_TOKEN
    const jiraEmail = 'i.lignos@snappibank.com'
    console.log(apiToken)
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${jiraEmail}:${apiToken}`
        ).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          project: {
            key: projectKey,
          },
          summary: `New request from ${firstName} ${lastName}`,
          issuetype: {
            name: issueType,
          },
          description: `
            Email: ${email}
            Category: ${category}
            Message: ${message}
          `,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Jira API error:', errorData)
      return res.json(
        { error: 'Failed to create Jira ticket' },
        { status: 500 }
      )
    }

    const data = await response.json()
    return res.json({
      message: 'Jira ticket created successfully',
      ticketId: data.id,
    })
  } catch (error) {
    console.error('Server error:', error)
    return res.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
