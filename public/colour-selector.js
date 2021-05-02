// Make connection
var socket = io();

// Query DOM
var modeInput = document.getElementById('mode-select-dropdown'),
    colorInput = document.getElementById('color-input'),
    brightnessInput = document.getElementById('brightness-input'),
    speedInput = document.getElementById('speed-input'),
    lengthInput = document.getElementById('length-input'),
    btn = document.getElementById('send');

var shownModeDiv = document.getElementById('simple-color-inputs');

document.addEventListener('DOMContentLoaded', function() {
    setInputs(activeInputsBytes[modeInput.selectedIndex])
}, false);

modeInput.addEventListener('change', function(){
    setInputs(activeInputsBytes[modeInput.selectedIndex])
})

var inputIDs = ["color-input-container", "brightness-input-container", "speed-input-container", "length-input-container"]
var activeInputsBytes = [ 3, 6, 7, 14, 15, 2 ];
// 1: Color
// 2: Brightness
// 4: Speed
// 8: Length

// Emit events
btn.addEventListener('click', function(){
    socket.emit('set-info', {
        mode: modeInput.selectedIndex,
        color: colorInput.value,
        brightness: brightnessInput.value,
        speed: speedInput.value,
        length: lengthInput.value
    });
    
    // switch(modeInput.value){
    //     case "simple-color-inputs":
    //         socket.emit('simple-color', {
    //             color: colorInput.value,
    //             brightness: brightnessInput.value
    //         });
    //         break;
    //     case "rainbow-mode-inputs":
    //         socket.emit('rainbow', {
    //             speed: rainbowSpeed.value
    //         });
    //         break;
    // }
});

function setInputs(byte) {
    for(i = 0; i < inputIDs.length; i++) {
        testValue = Math.pow(2, inputIDs.length - (i + 1));
        if(byte>=testValue) {
            byte-=testValue;
            showInput(inputIDs[inputIDs.length - 1- i])
        }
        else {
            hideInput(inputIDs[inputIDs.length - 1- i])
        }
    }
}

function showInput(id) {
    document.getElementById(id).style.height = null;
}

function hideInput(id) {
    document.getElementById(id).style.height = "0";
}