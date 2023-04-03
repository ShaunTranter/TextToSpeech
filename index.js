const textArea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
button = document.querySelector("button");



let isSpeaking = true;


function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      return;
    }
  
    const voices = speechSynthesis.getVoices();
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name}`;

  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      option.value = voices[i].name;


      document.getElementById("voiceSelect").appendChild(option);

    }
  }
  
  populateVoiceList();
  
  if (
    typeof speechSynthesis !== "undefined" &&
    speechSynthesis.onvoiceschanged !== undefined
  ) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function textToSpeech(text){
    let speech = new SpeechSynthesisUtterance(text);
    let voices = speechSynthesis.getVoices();
    
    for(let voice of voices){
        if(voice.name == voiceList.value){
            speech.voice = voice;
        }
    }


    console.log(speech);
   speechSynthesis.speak(speech);
  }

  button.addEventListener("click", e =>{
    e.preventDefault();
    if(textArea.value !==""){
        if(!speechSynthesis.speaking){
            textToSpeech(textArea.value);
        }

        if(textArea.value.length > 80){
            setInterval(() =>{
                if(!speechSynthesis.speaking && !isSpeaking){
                    isSpeaking = true;
                    button.innerText="Convert To Speech";
                }else{
                    
                }
            }, 1000);

            if(isSpeaking){
                speechSynthesis.resume();
                isSpeaking = false;
                button.innerText ="Pause";
            }else{
                speechSynthesis.pause();
                isSpeaking = true;
                button.innerText ="Resume";
            }
            }
            else{
               button.innerText ="Convert";
            }
        }
    })