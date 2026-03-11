# Universal AI API Tester

Universal AI API Tester is a streamlined, Python-based utility designed for the rapid verification and testing of Artificial Intelligence API keys. It provides a unified interface to interact with multiple AI providers, ensuring that credentials are valid and the respective services are operational.

## Core Features

- Unified Provider Support: Single interface for OpenAI, OpenRouter, and Google Gemini.
- Real-time Verification: Immediate feedback on API key validity through live chat interactions.
- Session Management: Localized chat history maintained during the application lifecycle.
- Error Diagnostics: Detailed reporting of request failures, authentication errors, and service timeouts.
- Secure Interaction: API keys are used for session-based authentication and are not persisted to disk.

## Technical Architecture

The application is built using the Streamlit framework, leveraging its reactive state management for the user interface. It integrates directly with provider-specific SDKs and REST endpoints:

- OpenAI: Integration via the official OpenAI Python library.
- OpenRouter: Implementation using standard HTTP/JSON protocols for broad model compatibility.
- Gemini: Integration via the Google Generative AI SDK.

## Prerequisites

- Python 3.8 or higher
- A valid API key from OpenAI, OpenRouter, or Google Gemini

## Installation and Setup

1. Clone the repository to your local environment.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - Unix/macOS: `source venv/bin/activate`
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

To launch the application, execute the following command from the project root:

```bash
streamlit run app.py
```

Once the web interface initializes:
1. Input the API key in the designated field.
2. Select the corresponding provider from the dropdown menu.
3. Submit a query via the chat interface to verify the connection.

## Dependency Specifications

The project relies on the following primary libraries:
- streamlit: UI framework and state management.
- openai: Communication with OpenAI services.
- google-generativeai: Interface for Google Gemini models.
- requests: Protocol handling for OpenRouter API.

## Security and Privacy

This tool is designed for testing purposes. API keys are handled within the Streamlit session state and are used only for making direct requests to the specified providers. Users should ensure they are running the application in a secure environment.
