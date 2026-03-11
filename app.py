import streamlit as st
import openai
import google.generativeai as genai
import requests
import json

# Set up page configuration
st.set_page_config(page_title="Universal AI API Tester", layout="centered", page_icon="🤖")

# Custom CSS for better UI (optional but nice)
st.markdown("""
    <style>
    .main {
        padding: 2rem;
    }
    .stTextInput > div > div > input {
        border-radius: 5px;
    }
    .stSelectbox > div > div > div {
        border-radius: 5px;
    }
    </style>
    """, unsafe_allow_html=True)

# Title
st.title("Universal AI API Tester")
st.markdown("---")

# Header Section: API Key and Provider Selection
col1, col2 = st.columns([2, 1])

with col1:
    api_key = st.text_input("API Key", type="password", placeholder="Paste your API key here...")

with col2:
    provider = st.selectbox("Provider", ["OpenAI", "OpenRouter", "Gemini"])

# Initialize session state for chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Function to call OpenAI
def call_openai(api_key, messages):
    """
    Calls OpenAI's Chat Completion API.
    """
    try:
        client = openai.OpenAI(api_key=api_key)
        # We use gpt-3.5-turbo as a lightweight model for testing
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": m["role"], "content": m["content"]} for m in messages]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"🚨 Error (OpenAI): {str(e)}"

# Function to call OpenRouter
def call_openrouter(api_key, messages):
    """
    Calls OpenRouter's API endpoint.
    """
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": "https://localhost",  # OpenRouter requirement
            "X-Title": "Universal AI API Tester",
            "Content-Type": "application/json"
        }
        # Using a standard model for testing
        data = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [{"role": m["role"], "content": m["content"]} for m in messages]
        }
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            data=json.dumps(data),
            timeout=30
        )
        
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            error_data = response.json() if response.content else {"error": {"message": response.text}}
            return f"🚨 Error (OpenRouter): {error_data.get('error', {}).get('message', response.text)}"
    except Exception as e:
        return f"🚨 Error (OpenRouter): {str(e)}"

# Function to call Gemini
def call_gemini(api_key, messages):
    """
    Calls Google's Gemini API.
    """
    try:
        genai.configure(api_key=api_key)
        # Using gemini-1.5-flash for fast testing
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Prepare history for Gemini
        # Gemini expects history as a list of dictionaries with 'role' and 'parts'
        # Roles are 'user' and 'model'
        gemini_history = []
        for m in messages[:-1]: # All except the last one
            role = "user" if m["role"] == "user" else "model"
            gemini_history.append({"role": role, "parts": [m["content"]]})
        
        chat = model.start_chat(history=gemini_history)
        last_message = messages[-1]["content"]
        response = chat.send_message(last_message)
        return response.text
    except Exception as e:
        return f"🚨 Error (Gemini): {str(e)}"

# Chat Interface Section
st.markdown("### Chat Interface")

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User input
if prompt := st.chat_input("Type your message here..."):
    # 1. Add user message to state and display
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # 2. Validation
    if not api_key:
        with st.chat_message("assistant"):
            st.error("Please provide an API key above to test the connection.")
    else:
        # 3. Call API with loading spinner
        with st.chat_message("assistant"):
            with st.spinner(f"Requesting {provider}..."):
                if provider == "OpenAI":
                    response_text = call_openai(api_key, st.session_state.messages)
                elif provider == "OpenRouter":
                    response_text = call_openrouter(api_key, st.session_state.messages)
                elif provider == "Gemini":
                    response_text = call_gemini(api_key, st.session_state.messages)
                
                # Display response
                st.markdown(response_text)
                
                # 4. Add response to history
                st.session_state.messages.append({"role": "assistant", "content": response_text})

# Add a clear button to reset the test
if st.button("Clear History"):
    st.session_state.messages = []
    st.rerun()
