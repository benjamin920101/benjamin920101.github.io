var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent



var recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = 'zh-TW';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');


hints.innerHTML = 'Tap/click then say.';

document.getElementById("button1").onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

document.getElementById("button2").onclick = function() {
  recognition.stop();
}


recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


    let isListening = false;
    let finalTranscript = '';
    let lastResult = '';

document.addEventListener('keydown', event => {
        if (event.key === 'v' && !isListening) {

            startRecognition();
        }
    });

    document.addEventListener('keyup', event => {
        if (event.key === 'v' && isListening) {

            stopRecognition();
        }
    });

    recognition.addEventListener('result', event => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');

        if (event.results[0].isFinal) {
            if (transcript !== lastResult) {
                lastResult = transcript;
                finalTranscript += transcript;
                insertText(finalTranscript);
                finalTranscript = '';
            }
        }
    });

    function startRecognition() {
        isListening = true;
        recognition.start();
        console.log('Recording... (Release V to Stop)');
    }

    function stopRecognition() {
        isListening = false;
        recognition.stop();
        console.log('Stopped Recording');
        lastResult = '';
        const textbox1=document.getElementById("prompt-textarea");
        textbox1.focus();
    }

    function insertText(text) {
        const input = document.querySelector('textarea');
        input.value = text;
		  hints.focus();
    }
