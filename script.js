const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetBtn = document.querySelector(".reset"),
chooseImgBtn = document.querySelector(".choose-img"),
saveBtn = document.querySelector(".save");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0", contrast = "100", sepia = "0", hue = "0", blurred = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${sepia}%) hue-rotate(${hue}deg) blur(${blurred}px)`;
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.min = "0";
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.min = "0";
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.min = "0";
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if(option.id === "grayscale") {
            filterSlider.min = "0";
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } else if(option.id === "contrast") {
            filterSlider.min = "0";
            filterSlider.max = "200";
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`;
        } else if(option.id === "sepia") {
            filterSlider.min = "0";
            filterSlider.max = "100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        } else if(option.id === "hue") {
            filterSlider.min = "- 180";
            filterSlider.max = "+ 180";
            filterSlider.value = hue;
            filterValue.innerText = `${hue}deg`;
        } else {
            filterSlider.min = "0";
            filterSlider.max = "10";
            filterSlider.value = blurred;
            filterValue.innerText = `${blurred}px`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    } else if(selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    } else if(selectedFilter.id === "sepia") {
        sepia = filterSlider.value;
    } else if(selectedFilter.id === "hue") {
        hue = filterSlider.value;
    } else {
        blurred = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const reset = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0"; contrast = "100"; sepia = "0"; hue ="0"; blurred = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const save = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%) sepia(${sepia}%) hue-rotate(${hue}deg) blur(${blurred}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

filterSlider.addEventListener("input", updateFilter);
resetBtn.addEventListener("click", reset);
saveBtn.addEventListener("click", save);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());