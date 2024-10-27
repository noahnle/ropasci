// get dom elements
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user-result img");
const cpuResult = document.querySelector(".cpu-result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option-image");
const score = document.querySelector(".score");

// loop thru each option
optionImages.forEach((image, index) => {
  image.addEventListener("click", (event) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "img/rock.png";
    
    
    result.textContent = "";  // make loading text
    result.classList.add("loading-text");

    // loop thru each option again
    optionImages.forEach((image2, index2) => {
      // remove active if indices dont match
      index !== index2 && image2.classList.remove("active");
    });
    
    gameContainer.classList.add("start");

    // set timer to delay result
    let timer = setTimeout(() => {
      gameContainer.classList.remove("start");

      // get the source of the clicked option img
      let imageSrc = event.target.querySelector("img").src;
      userResult.src = imageSrc;  // set the user img to the clicked img
  
      // rng 0 to 2 and set cpu image to random option
      let randomNumber = Math.floor(Math.random() * 3);
      let cpuImages = ["img/rock.png", "img/paper.png", "img/scissors.png"];
      cpuResult.src = cpuImages[randomNumber];
  
      // set value to user and cpu option
      let userValue = ["r", "p", "s"][index];
      let cpuValue = ["r", "p", "s"][randomNumber];
      // object with all outcomes
      let outcomes = {
        rr: "draw",
        rp: "lose",
        rs: "win",
        pr: "win",
        pp: "draw",
        ps: "lose",
        sr: "lose",
        sp: "win",
        ss: "draw"
      };
      let outcomeValue = outcomes[userValue + cpuValue];

      result.classList.remove("loading-text");
      
      // display results
      result.textContent = userValue === cpuValue ? "draw" : `you ${outcomeValue}!`;

      if (outcomeValue === "win") {
        score.textContent = parseInt(score.textContent) + 1;
      } else if (outcomeValue === "lose") {
        score.textContent = parseInt(score.textContent) - 1;
      }
    }, 1400);
  });
});