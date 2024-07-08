import os
import base64
from flask import Flask, request, jsonify, render_template
from gtts import gTTS

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/texttospeech', methods=['POST'])
def text_to_speech():
    # Get the text from the request body
    data = request.json
    text = data.get('text', '')

    # Create the gTTS object for Tagalog
    tts = gTTS(text=text, lang='tl', slow=False)

    # Save the audio to a temporary file
    audio_file_path = 'output.mp3'
    tts.save(audio_file_path)

    # Read the temporary file and convert it to base64
    with open(audio_file_path, 'rb') as file:
        audio_bytes = file.read()
        audio_base64 = base64.b64encode(audio_bytes).decode()

    # Remove the temporary file
    os.remove(audio_file_path)

    # Return the audio content as base64 encoded string
    return jsonify({'audio_base64': audio_base64})

if __name__ == '__main__':
    app.run(debug=True)
