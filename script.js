

// ✏️ CHANGE THIS to your own model URL
var MODEL_URL = "https://teachablemachine.withgoogle.com/models/DY7pFRNqM/";

// This variable will hold our AI model once it loads
var model;

// This runs automatically when the page loads
// Students don't need to understand async — just tell them
// "this loads the AI brain, it takes a second"
async function loadModel() {
    model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
    console.log("Model ready!");
}

// When the user picks a file, show a preview
function showPreview() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    var img = document.getElementById("preview");
    img.src = URL.createObjectURL(file);
    img.style.display = "block";
}

// When the user clicks Analyze, run the prediction
async function runPrediction() {

    // Get the image the user uploaded
    var img = document.getElementById("preview");

    // Make sure they actually picked an image first
    if (img.style.display === "none") {
        alert("Please pick an image first!");
        return;
    }

    // Ask the AI model to look at the image
    var results = await model.predict(img);

    // Build the output text
    var output = "";

    for (var i = 0; i < results.length; i++) {
        var name = results[i].className;
        var confidence = (results[i].probability * 100).toFixed(1);
        output = output + name + ": " + confidence + "%" + "<br>";
    }

    // Show the results on the page
    document.getElementById("label-container").innerHTML = output;
}

// Load the model when the page opens
loadModel();

