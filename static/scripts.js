function convertToSpeech() {
  const inputText = document.getElementById('inputText').value;
  fetch('/texttospeech', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'text': inputText
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.audio_base64) {
          const audioPlayer = document.getElementById('audioPlayer');
          const audioBlob = b64toBlob(data.audio_base64);
          const audioUrl = URL.createObjectURL(audioBlob);
          audioPlayer.src = audioUrl;
          audioPlayer.style.display = 'block';
          audioPlayer.play();
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function b64toBlob(base64) {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'audio/mpeg' });
}
