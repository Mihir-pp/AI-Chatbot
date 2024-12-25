# Chatbot Application

This project implements a simple chatbot using the `facebook/blenderbot-400M-distill` model from Hugging Face. The chatbot provides conversational responses and maintains a conversation history. The backend is built with Flask, and the application includes a web interface.

## Features

- Interactive chatbot functionality.
- Maintains conversation history.
- Built with Flask for the backend.
- Uses the Hugging Face `transformers` library.

---

## Prerequisites

Make sure you have the following installed:

- Python 3.7 or higher
- pip (Python package manager)

Install the required dependencies by running:

```bash
pip install flask flask-cors transformers
```

---

## Project Structure

```
.
├── app.py               # Main application script
├── templates/
│   └── index.html      # HTML file for the web interface
└── readme.md            # Project documentation
```

---

## How to Run the Application

1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Run the Flask application:

```bash
python app.py
```

The application will start on `http://127.0.0.1:5000/`.

---

## Endpoints

### `GET /`
- Renders the homepage (HTML interface).

### `POST /chatbot`
- Accepts a user prompt and returns a chatbot response.
- **Request Body:**
  ```json
  {
    "prompt": "Your message here"
  }
  ```
- **Response:**
  Returns the chatbot's response as plain text.

---

## Handling Long Conversations

The chatbot stores the conversation history to provide context. However, as the history grows, it might exceed the model's maximum token limit, leading to errors. To prevent this:

- Limit the conversation history to the most recent messages.
- Truncate history dynamically in `app.py`.

Example:

```python
# Truncate conversation history if it exceeds the token limit
max_history_length = 128 - len(tokenizer.encode(input_text))
truncated_history = conversation_history[-max_history_length:]
```

---

## Troubleshooting

### Common Issues

1. **Sequence Length Exceeds Maximum:**
   Ensure the conversation history and input are within the model's token limit (128 tokens).

2. **Model Download Timeout:**
   Ensure you have a stable internet connection during the first run, as the model is downloaded from Hugging Face.

### Debugging Tips

- Check the server logs for detailed error messages.
- Use `curl` or Postman to test the `/chatbot` endpoint.

---

## License

This project is licensed under the MIT License. Feel free to modify and use it as needed.

---

## Acknowledgments

- Hugging Face for the `transformers` library and pre-trained models.
- Flask for the lightweight web framework.
