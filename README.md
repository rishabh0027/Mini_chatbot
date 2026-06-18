# 🤖 AI Chatbot Web Application

An AI-powered chatbot web application built using **Python, Flask, Ollama, SQLite, HTML, CSS, and JavaScript**. The project integrates local Large Language Models (LLMs) such as **Qwen 2.5, Phi-3, and Gemma** through Ollama, enabling intelligent and private AI conversations directly on the user's machine.

## 🚀 Features

* Real-time AI chatbot interaction
* Local LLM integration using Ollama
* Multiple model support (Qwen, Phi-3, Gemma)
* Chat history storage using SQLite
* Modern ChatGPT-inspired UI
* Markdown-formatted AI responses
* Sidebar chat history navigation
* Responsive and user-friendly interface
* Flask-based REST API backend

## 🛠️ Tech Stack

### Backend

* Python
* Flask
* SQLite
* Requests

### Frontend

* HTML5
* CSS3
* JavaScript

### AI Integration

* Ollama
* Qwen 2.5
* Phi-3
* Gemma

## 📂 Project Structure

```text
chatbot/
│
├── app.py
├── chat_history.db
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatbot.git
cd chatbot
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Ollama

Download and install Ollama from:

https://ollama.com

### 4. Pull a Model

```bash
ollama pull qwen2.5:1.5b
```

or

```bash
ollama pull qwen2.5:3b
```

### 5. Run the Application

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

## 🎯 Learning Outcomes

This project helped in understanding:

* Flask web development
* REST API integration
* Frontend and backend communication
* Local AI model deployment
* Database management using SQLite
* Prompt engineering
* AI application development

## 🔮 Future Enhancements

* Streaming responses like ChatGPT
* User authentication
* Export chat history
* Voice input/output
* Conversation memory
* Docker deployment
* Cloud hosting support

## 📸 Preview

A ChatGPT-style AI assistant capable of generating intelligent responses using locally hosted LLMs while maintaining privacy and low operational costs.

## 👨‍💻 Author

**Rishabh Singh**

B.Tech Computer Science Engineering (AI & Data Science)

Graphic Era Deemed to be University

LinkedIn: https://www.linkedin.com/in/rishabh-singh-r2004

GitHub: https://github.com/rishabh0027
