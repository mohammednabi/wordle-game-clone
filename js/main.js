let boxes = document.querySelectorAll(".box");
let exit = document.querySelector(".exit");
let exitHow = document.querySelector(".exit-how");
let statics = document.querySelector(".statics");
let HowToPlay = document.querySelector(".how-to-play");
let overlay = document.querySelector(".overlay");
let StaticIcon = document.querySelector(".static-icon");
let SettingIcon = document.querySelector(".settings-icon");
let InformationIcon = document.querySelector(".information-icon");
let playedSpan = document.querySelector(".played");
let winnedSpan = document.querySelector(".winned");
let Settinglist = document.querySelector(".setting-list");
let LightMode = document.querySelector("#light-mode");
let DarkList = document.querySelector(".dark");
let LightList = document.querySelector(".light");

let played = 0;
let winned = 0;

let index = 0;

let Randomedword = GetRandomWord(words);
let row = 1;
let initial = 0;

let playAgain = document.getElementById("play-again");
let myTitle = document.getElementById("titly");
let trials = 6;

// localStorage.setItem("played", played);
// localStorage.setItem("wins", winned);
// localStorage.setItem("light", true);
// localStorage.removeItem("played");
// localStorage.removeItem("wins");







function SetKeyboardKeys()
{
    document.addEventListener("keydown", function (e) {
        if (index < 5*row && index >= initial)
        {
          if (IsLetter(e.key.toUpperCase())) {
        if (AddLetter(boxes, index, e.key)) {
          index++;
        }
      }

   
        
     

     
        }
        
           if (e.key === "Backspace") {
             if (RemoveLetter(boxes, index,initial)) {
               index--;
             }
        }

        if (e.key === "Enter")
        {
            if (index < 31)
            {
                 

                 if (CheckValid(words, GetWrittenWord(boxes, index))) {
                   CheckWord(GetWrittenWord(boxes, index), Randomedword, index);
                   if (
                     CheckWinOrLose(
                       GetWrittenWord(boxes, index),
                       Randomedword,
                       index,
                       row,
                       Randomedword
                     )
                   ) {
                     index = 31;
                     }
                   else
                   {
                        row++;
                        trials--;
                        SetTitle(trials);
                     }
                    
                   initial = initial + 5;
                 } else {
                   alert("not valid word");
                 }
            }
           
        }
       
        
    });
}


function AddLetter(arr,index,letter)
{
    if (index < arr.length)
    {
      arr[index].textContent = `${letter}`.toUpperCase();
      arr[index].style.animation = "shake .2s ease-in-out";
      arr[index].style.border = "2px solid var(--box-color-after-write)";
        return true;
     }
    
    
}

function RemoveLetter(arr, index ,initial)
{
    if (index > initial)
    {
      arr[index - 1].textContent = ``;
      arr[index - 1].style.animation = "";
      arr[index-1].style.border = "2px solid var(--gray-color)";
        return true;
    }
    
}

function IsLetter(letter)
{
    return Boolean(letter.match(/[A-Z]/g) && letter.length === 1);
}

function GetRandomWord(items)
{
    return  items[Math.floor(Math.random()*items.length)];
}


function GetWrittenWord(arr,index)
{
    if (index % 5 != 0)
    {
        alert("you must write 5 letters")
    }

    else
    {
        let written = [];
        let filtered = [];
         for (i = index - 5; i < index; i++) {
           written[i] = arr[i].textContent;
        }
        
        filtered = written.filter((item)=> item !== "")
         return filtered;
    }

   

   
}

function CheckValid(dictionary=[],writtenWord=[])
{
  
    return dictionary.includes(writtenWord.join("").toLowerCase());
}


function CheckWord(WrittenWord,Randomedword,index)
{

    for (let i = index - 5 ,j=0; i < index , j<5;i++ ,j++)
    {

      if (Randomedword.includes(WrittenWord[j].toLowerCase())) {
          
           if (WrittenWord[j] === Randomedword[j].toUpperCase()) {
               boxes[i].classList.add("right");
              
               boxes[i].style.transform = "rotatex(360deg)";
          }
           else
           {
               boxes[i].classList.add("wrong");
               boxes[i].style.transform = "rotatex(360deg)";
          }
        }
      else
      {
          boxes[i].classList.add("empty");
          boxes[i].style.transform = "rotatex(360deg)";
        }
    }

       
       


}

function CheckWinOrLose(WrittenWord, Randomedword, index,row,WinWord)
{
    let CorrectLetters = 0;
    for (let i = 0; i < 5; i++)
    {
        if (WrittenWord[i] === Randomedword[i].toUpperCase()) {
            CorrectLetters++;
  }
    }
    
    if (CorrectLetters === 5)
    {
      WriteWin();
      IncreaseWins();
      IncreasePlayed();
        return true;
    }

    if (row ===6 && CorrectLetters !== 5)
    {
      WriteLose(WinWord);
      IncreasePlayed();
    }

  
}

function LetsplayAgain()
{
    playAgain.addEventListener("click", function ()
    {

    window.location.reload();
    })
        

}

function SetTitle(trials)
{
    setTimeout(function ()
    {
        if (trials > 3) {
          myTitle.innerHTML = `You Have <span id="trials">${trials}</span> Trials`;
        } else if (trials === 3) {
          myTitle.innerHTML = `You Have <span id="trials" class="yellow">${trials}</span> Trials`;
        } else {
          myTitle.innerHTML = `You Have <span id="trials" class="red">${trials}</span> Trials`;
        }
    }, 1000)
    

}

function WriteWin() {
  setTimeout(function () {
 
    myTitle.innerHTML = `You Have <span id="trials" class="">win</span> the game`;
  
    
  }, 2000);

    
}

function WriteLose(WinWord) {
  setTimeout(function () {
      setInterval(function () {
        myTitle.innerHTML = `the word is <span id="trials" class="yellow">${WinWord}</span> !hard luck`;
    
          
          
        }, 2000);
    myTitle.innerHTML = `oh sorry 😔! You Have <span id="trials" class="red">lose</span> the game`;
      
  }, 3000);
    
   
    
}

function ExitStatics()
{
  exit.addEventListener("click", function ()
  {
    statics.style.opacity = "0";
    statics.style.transform = "translate(-50%,120%)";
    overlay.style.oopacity = "0";
    setTimeout(function ()
    {
      statics.style.display = "none";
      overlay.style.display = "none";
      
    },300)

  })
  
  
  
}

function DisplayStatics()
{
  StaticIcon.addEventListener("click", function ()
  {
    statics.style.transform = "translate(-50%,0)";
    statics.style.display = "flex";
    overlay.style.display = "block";

    setTimeout(function ()
    {
      statics.style.opacity = "100%";
      overlay.style.opacity = "70%";
      
    },300)

     
   });
  SetPlayedSpan();
  SetWinsSpan();
  
}

function ExitHowToPlay()
{
   exitHow.addEventListener("click", function () {
     HowToPlay.style.opacity = "0";
     HowToPlay.style.transform = "translate(-50%,120%)";
     overlay.style.oopacity = "0";
     setTimeout(function () {
       HowToPlay.style.display = "none";
       overlay.style.display = "none";
     }, 300);
   });
}

function DisplayHowToPlay()
{
   InformationIcon.addEventListener("click", function () {
     HowToPlay.style.transform = "translate(-50%,0)";
     HowToPlay.style.display = "flex";
     overlay.style.display = "block";

     setTimeout(function () {
       HowToPlay.style.opacity = "100%";
       overlay.style.opacity = "70%";
     }, 300);
   });
  
}

function IncreaseWins()
{
  winned = localStorage.getItem("wins");
  ++winned;
  localStorage.setItem("wins", winned);

}

function IncreasePlayed()
{
  played = localStorage.getItem("played");
  ++played;
  localStorage.setItem("played", played);
  

}

function SetWinsSpan()
{
   winnedSpan.innerHTML = `${localStorage.getItem("wins")}`;
}

function SetPlayedSpan()
{
 
  playedSpan.innerHTML = `${localStorage.getItem("played")}`;
}

function DisplaySetting()
{
  
  SettingIcon.addEventListener("click", function ()
  {
    
  
    if (Settinglist.style.opacity === "0")
    {
      Settinglist.style.display = "block";
      setTimeout(function ()
      {
        
        Settinglist.style.opacity = "100%";
      },1)
    }

    else
    {
      Settinglist.style.opacity = "0";
      setTimeout(function () {
        Settinglist.style.display = "none";
      }, 300);
    }

})

}


function SetLightMode()
{
  LightList.addEventListener("click", function ()
  {
    localStorage.setItem("light", "/css/lightmode.css");
      LightMode.setAttribute("href", localStorage.getItem("light"));
  })
}

function SetDarkMode()
{
  DarkList.addEventListener("click", function ()
  {
    
      
      localStorage.setItem("light", "");
     
  LightMode.setAttribute("href", localStorage.getItem("light"));
    
  })
}

// start the game

function StartGame()
{
    

    
  SetTitle(trials);
  
  
  
      SetKeyboardKeys();
   
  LetsplayAgain();
  ExitStatics();
  DisplayStatics();
  DisplaySetting();
  ExitHowToPlay();
  DisplayHowToPlay();
  SetLightMode();
  SetDarkMode();
  LightMode.setAttribute("href", localStorage.getItem("light"));
  

   
}


window.addEventListener("load", function ()
{
  StartGame();
 
    
})