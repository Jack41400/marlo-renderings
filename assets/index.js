
const imageReel = document.getElementById("image-reel");

window.onmousedown = e => {
    console.log("Down");
    imageReel.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
    console.log("Up");
    imageReel.dataset.mouseDownAt = "0";
}

window.onmousemove = e => {
    //if(imageReel.dataset.mouseDownAt === "0") return;
    console.log("moving");
    const mouseDelta = parseFloat(imageReel.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;

    imageReel.style.transform = `translate(${percentage}%, -50%)`;
}