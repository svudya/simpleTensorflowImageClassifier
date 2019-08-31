let net;

const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

function uploadFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
    app();
}

async function app() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');
    classify();
}

async function classify(){
    // Make a prediction through the model on our image.
    const imgEl = document.getElementById('img');
    const result = await net.classify(imgEl);
    const breed = document.getElementById('breed');
    const resultpara = document.getElementById('result');
    breed.innerHTML = result[0].className;
    let prob = result[0].probability * 100;
    resultpara.innerHTML = prob.toFixed(2) + "%";
    console.log(result);
}

app();