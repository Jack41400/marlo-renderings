// this file is responsible for the interactivity of the image reel, allowing the user to click and drag to scroll through the images
const imageReel = document.getElementById("image-reel");

// these are used to track the current percentage and the next percentage to avoid needing to read from the DOM on every mouse move
let _nextPercentage = 0;

// initialize data attributes for the image reel if they don't exist
if (imageReel) {
    if (!imageReel.dataset.mouseDownAt) imageReel.dataset.mouseDownAt = "0";
    if (!imageReel.dataset.prevPercentage) imageReel.dataset.prevPercentage = "0";
}

// event listeners for mouse down, mouse up, and mouse move to handle the dragging of the image reel
window.onmousedown = e => {
    if (!imageReel) return;
    imageReel.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    if (!imageReel) return;
    imageReel.dataset.mouseDownAt = "0";
    imageReel.dataset.prevPercentage = String(_nextPercentage);
}

window.onmousemove = e => {
    if (!imageReel) return;
    if (imageReel.dataset.mouseDownAt === "0") return;

    // calculate the new percentage based on the mouse movement and update the image reel's transform
    const mouseDownAt = parseFloat(imageReel.dataset.mouseDownAt);
    const prev = parseFloat(imageReel.dataset.prevPercentage) || 0;
    const mouseDelta = e.clientX - mouseDownAt;
    const maxDelta = window.innerWidth / 2;

    // calculate the percentage change based on the mouse movement, and apply it to the previous percentage to get the new percentage
    const deltaPercentage = (mouseDelta / maxDelta) * 100;

    // calculate the next percentage and clamp it between 0 and -100 to prevent it from going too far
    let percentage = prev + deltaPercentage;
    percentage = Math.max(Math.min(percentage, 0), -100);

    // update the next percentage and apply the transform to the image reel
    _nextPercentage = percentage;

    // apply the transform to the image reel to move it based on the new percentage
    imageReel.style.transform = `translate(${percentage}%, -50%)`;
}