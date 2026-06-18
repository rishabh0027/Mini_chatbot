from flask import Flask, render_template, request, jsonify
import requests
import sqlite3
import time
import markdown

app = Flask(__name__)

DB = "chat_history.db"


def init_db():
    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS chats(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_message TEXT,
        bot_response TEXT
    )
    """)

    conn.commit()
    conn.close()


init_db()


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():

    data = request.get_json()

    prompt = data['message']

    start = time.time()

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model":  "qwen2.5:1.5b",
            "prompt": f"""
You are ChatGPT, an expert AI assistant.

Instructions:
- Give detailed and comprehensive answers.
- Explain concepts step-by-step.
- Use headings and subheadings.
- Use bullet points where appropriate.
- Provide examples whenever possible.
- For technical questions, include code examples.
- For educational topics, explain as if teaching a student.
- Never give one-line answers unless specifically requested.
- Format answers professionally using markdown.

User Question:
{prompt}
""",
            "stream": False,
            "options": {
                "temperature": 0.7,
                "num_predict": 600,
                "top_k": 40,
                "top_p": 0.9
            }
        }
    )

    raw_response = response.json()['response']

    ai_response = markdown.markdown(
        raw_response,
        extensions=['fenced_code']
    )

    print(
        "Response Time:",
        round(time.time() - start, 2),
        "seconds"
    )

    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO chats(user_message, bot_response)
        VALUES (?,?)
        """,
        (prompt, raw_response)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "response": ai_response
    })


@app.route('/history')
def history():

    conn = sqlite3.connect(DB)

    rows = conn.execute(
        "SELECT * FROM chats ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return jsonify(rows)


if __name__ == '__main__':
    app.run(debug=True)