export class Claude {
    private apiKey: string;
    
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async ask(question: string): Promise<string> {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet',
                messages: [{ role: 'user', content: question }]
            })
        });

        const data = await response.json();
        return data.content[0].text;
    }

    async explain(code: string): Promise<string> {
        return this.ask(`Explain this code:\n\n${code}`);
    }
}