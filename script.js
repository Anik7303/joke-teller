const button = document.getElementById('button')
const audio = document.getElementById('audio')

// Disable/Enable button
function toggleButtonState() {
    button.disabled = !button.disabled
}

// convert text to speech
async function converTextToSpeech(text) {
    const url = `https://api.voicerss.org/?key=a8e0fb66baba4e76b5ebad72d2bab7e7&hl=en-us&src=${text}&b64=true`
    try {
        const response = await fetch(url)
        return await response.text()
    } catch (error) {
        console.error(`ConvertTextToSpeechError: ${error}`)
    }
}

// get a joke from api
async function fetchJoke() {
    const url =
        'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const response = await fetch(url)
        const data = await response.json()
        const { type, setup, delivery } = data
        return type === 'single' ? data.joke : `${setup} ... ${delivery}`
    } catch (error) {
        console.error(`GetJokeError: ${error}`)
    }
}

// fetch a joke, pass the fetched joke to VoiceRSS API, play the joke
async function tellMeAJoke() {
    toggleButtonState()
    try {
        const joke = await fetchJoke()
        const audioSrc = await converTextToSpeech(joke)
        // new Audio(audioSrc).play()
        // attach the base64 string to audio element, play the audio
        audio.src = audioSrc
        audio.play()
    } catch (error) {
        console.error(`TellMeAJokeError: ${error}`)
    }
}

// Event listeners
button.addEventListener('click', tellMeAJoke)
audio.addEventListener('ended', toggleButtonState)
