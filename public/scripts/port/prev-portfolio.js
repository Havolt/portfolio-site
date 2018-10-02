//function utilized across site for creating elements
function creEl(el, classes, apndClass, apndClassNum, inHL, id, src){
    let newEl = document.createElement(el);
    if(typeof(classes) == 'string'){
        newEl.classList.add(classes);
    }else{
        for(let i = 0; i < classes.length; i++){newEl.classList.add(classes[i])}
    }
    if(inHL){newEl.innerHTML = inHL};
    if(id){newEl.id = id}
    if(src){newEl.src = src}
    document.getElementsByClassName(apndClass)[apndClassNum].appendChild(newEl);
}

//function used in opening external web pages
function openWebPage(elClass, numOfClass, destinationLink, selfTrue){
    document.getElementsByClassName(elClass)[numOfClass].addEventListener('click', function(){
        if(!selfTrue){window.open(destinationLink);
        }else{window.open(destinationLink, '_self')}
    })
}




/* New File */




//object containg information required for functions on the webpage
let introData = {logoMF : true, arrowRotateNum : 0, textJumpNum : 0, textJumpDir : -2 }

//creates the star divs on the page by passing in the amount wanted and the size ('Small', 'Medium', 'Large')
function createStars(amt, size){
    for(let i = 0; i < amt; i++){
        let xPos = Math.floor(Math.random()*90) +10;
        let yPos = Math.floor(Math.random()*36) + 5;
        creEl('div', ['intStar'+size, 'intStar'], 'introDiv', 0);
        document.getElementsByClassName('intStar'+size)[i].style.left = xPos+'%';
        document.getElementsByClassName('intStar'+size)[i].style.top = yPos+'%';
    }
}

//moves the stars at different speeds depending on the size of the div
function moveStars(size){
    for(let i = 0; i < document.getElementsByClassName('intStar'+size).length; i++){
        let nextXPos = document.getElementsByClassName('intStar'+size)[i].style.left;
        nextXPos = nextXPos.split('%')[0];
        if(nextXPos < 0){nextXPos = 101}
        if(size == 'Small'){nextXPos -= 0.04;}
        if(size == 'Medium'){nextXPos -= 0.08;}
        if(size == 'Large'){nextXPos -= 0.12;}
        document.getElementsByClassName('intStar'+size)[i].style.left = nextXPos + '%';
    }
}

//swaps the logo when clicked between 'MF' and 'JS' and cycles through symbols to make effect look fluid
function changeLogo(bool){
    let logoTimer = 50;
    let symbols = ['A', '$', '4', 'R', '8', '$', '?', 'L', 'S', '2', '7', 'T'];
    for(let i = 0; i < symbols.length; i++){
        setTimeout(function(){document.getElementsByClassName('intLogoDiv')[0].innerHTML= symbols[i]+symbols[symbols.length-i-1]+''}, logoTimer)
        logoTimer+= 50;
        if(i == symbols.length-1){
            if(bool){
                setTimeout(function(){document.getElementsByClassName('intLogoDiv')[0].innerHTML= 'JS'}, logoTimer);
                introData.logoMF = false;
            }else{setTimeout(function(){document.getElementsByClassName('intLogoDiv')[0].innerHTML= 'MF'}, logoTimer); introData.logoMF = true;}
        }
    }
}

//calls all moveStars function in one single function
function moveAll(){
    moveStars('Small');
    moveStars('Medium');
    moveStars('Large');
    setTimeout(function(){moveAll()}, 90)
}

//transforms the arrow and by doing so gives the illusion of rotation
function rotateArrow(arrow){
    arrow.style.transform = "rotateY("+introData.arrowRotateNum+"deg)";
    introData.arrowRotateNum =  introData.arrowRotateNum + 12;
    if(introData.arrowRotateNum > 180){
        introData.arrowRotateNum = 0;
        setTimeout(function(){rotateArrow(arrow);}, 1180)
    }
    else if(introData.arrowRotateNum > 89 && introData.arrowRotateNum < 100){
        setTimeout(function(){rotateArrow(arrow); textJump(document.getElementsByClassName('intMoreText')[0])}, 180)
    }
    else{
        setTimeout(function(){rotateArrow(arrow)}, 180)
    }
}

//Makes the text move up and down when the arrow spins to a certain degree
function textJump(text){

    introData.textJumpNum = introData.textJumpNum + introData.textJumpDir;
    text.style.transform = "translateY("+introData.textJumpNum+"px)";

    if(introData.textJumpNum == 0){introData.textJumpDir = -introData.textJumpDir }
    else if(introData.textJumpNum < 1 && introData.textJumpNum > -3){
        setTimeout(function(){textJump(text)}, 80);
    }
    else{
        introData.textJumpDir = -introData.textJumpDir;
        setTimeout(function(){textJump(text)}, 80);
    }
}

//initializes the intro section
(function initIntroSec(){
    creEl('div', ['introDiv', 'sectionMainDiv'], 'app', 0,);
    creEl('div', 'intLogoDiv', 'introDiv', 0, 'MF');
    creEl('div', 'intText', 'introDiv', 0 , "Hi, I'm Mark. A Front End Web Developer.");
    creEl('div', ['portButton','intButton'], 'introDiv', 0, 'GET IN TOUCH');
    creEl('div', 'intMoreContain', 'introDiv', 0);
    creEl('div', 'intMoreText', 'intMoreContain', 0, 'Tell me more');
    creEl('div', 'intMoreArrow', 'intMoreContain', 0, '<i class="fa fa-angle-down"></i>');
    createStars(32, 'Small');
    createStars(14, 'Medium');
    createStars(4, 'Large');

    setTimeout(function(){
        moveAll();
    }, 180)

    rotateArrow( document.getElementsByClassName('intMoreArrow')[0] );


    document.getElementsByClassName('intLogoDiv')[0].addEventListener('click', function(){changeLogo(introData.logoMF)})
})()





/* New File */




//creates each about section
function createAboutListItem(listItemName, iconHL, titleHL, paraHL){
    creEl('div', ['aboutListItem', 'abl'+listItemName], 'aboutListContain', 0);
    creEl('div', ['aboutListIcon', 'abli'+listItemName], 'abl'+listItemName, 0, iconHL);
    creEl('div', ['aboutListTitle', 'ablt'+listItemName], 'abl'+listItemName, 0, titleHL );
    creEl('div', ['aboutListParagraph', 'ablp'+listItemName], 'abl'+listItemName, 0, paraHL);
}


//initializes about section
(function initAboutSec(){
    creEl('div', ['aboutDiv', 'sectionMainDiv'], 'app', 0);

    creEl('div', 'aboutIntro', 'aboutDiv', 0);
    creEl('div', 'aboutIntroText', 'aboutIntro', 0);
    creEl('div', ['aboutTitle', 'sectionTitle'], 'aboutIntroText', 0, 'About Me');
    creEl('div', ['aboutParagraph', 'sectionParagraph'], 'aboutIntroText', 0, "I am an experienced Front End web developer and have spent years perfecting my skills in JavaScript and CSS. I have done a degree in multimedia which dealt with topics such as web design, programming and graphic design. Since then I have spent my time creating numerous complex projects in JavaScript. ")
    creEl('div', ['aboutParagraph', 'sectionParagraph', 'aboutParagraphHidden'], 'aboutIntroText', 0, 'I am currently looking for a challenging front end position which will utilize my talents. I have experience with gitHub and many JavaScript frameworks.')
    creEl('div', 'aboutProfilePic', 'aboutIntro', 0);
    creEl('img', 'aboutPPImg', 'aboutProfilePic', 0, '', '', '/imgs/pp1.jpg');

    creEl('div', 'aboutListContain', 'aboutDiv', 0);
    createAboutListItem('Responsive', '<i class="fa fa-mobile"></i>', 'Responsive Design', 'I put a strong focus on creating responsive websites to fit all screen sizes and types. I build from the ground up to fit mobile first design practices and make beautiful websites from the ground up.');
    createAboutListItem('Code', '<i class="fa fa-code"></i>', 'Programming Skills', 'I have very strong JavaScript skills which I utilize to create interactive pages . In the past I have created complicated applications such as checkers and tetris with vanilla JavaScript.'  )
    createAboutListItem('Design', '<i class="fa fa-paint-brush"></i>', 'Beautiful Interfaces', 'I have gained a lot of knowledge on creating elegant, user friendly websites where inormation is presented in a clear and eye-catching way.');

})()




/* New File */




let projectData = {fadeAmt : 0.1, fadeDir: 0.1, showingMore : false, link : '', projectInfoExist: false}

//Function that creates the individual projects in this section
function creProjectItem(itemApnd, itemNum, itemImgClass,  itemImgTitle, itemImgDesc){
    creEl('div', 'projectItemContain', itemApnd, 0);
    creEl('div', 'projectItem', 'projectItemContain', itemNum);
    creEl('div', ['projectItemImg', 'projectItemImg'+itemImgClass], 'projectItem', itemNum);
    creEl('div', ['projectItemImgOver', 'projectIIO'+itemImgClass], 'projectItem', itemNum);
    creEl('div', ['projectItemImgOverTitle', 'projectIIOT'+itemImgClass], 'projectItemImgOver', itemNum, itemImgTitle + ' ' + itemImgClass);
    creEl('div', ['projectItemDesc', 'projectItemDesc'+itemImgClass], 'projectItemContain', itemNum, itemImgDesc);
}

//Creates fade effect for info divs that pop up in project section
function fadeInfo(bool){
    if(projectData.fadeAmt > 0 && projectData.fadeAmt < 1){
        projectData.fadeAmt = projectData.fadeAmt + projectData.fadeDir;
        projectData.fadeAmt = Math.round(projectData.fadeAmt * 10) / 10;
        document.getElementsByClassName('projectDarken')[0].style.opacity=projectData.fadeAmt;
        
        setTimeout(function(){fadeInfo(bool)}, 40)
    }else{ 
        projectData.fadeDir = -projectData.fadeDir; 
        projectData.fadeAmt = projectData.fadeAmt + projectData.fadeDir
        if(bool){document.getElementsByClassName('projectDarken')[0].classList.add('hidden')}    
    }
}

//gives the div of class 'projectDarken' the hidden class or removes it
function toggleHidden(darkDiv){
    projectData.projectInfoExist = !projectData.projectInfoExist;
    let foundClass = false;
    for(let i = 0; i < darkDiv.classList.length; i++){
        if(darkDiv.classList[i] == 'hidden'){
            foundClass = true;
        }
    }
    if(foundClass){darkDiv.classList.remove('hidden'); fadeInfo()}
    else{fadeInfo(true);}
}

//Changes the innerHTML of the info div wit title, img source, description area and button
function addProjectInHL(title, imgLink, description, lnk){
    document.getElementsByClassName('projectInfoTitle')[0].innerHTML = title;
    document.getElementsByClassName('projectInfoButton')[0].innerHTML = 'View ' + title;
    document.getElementsByClassName('projectInfoImg')[0].src='/imgs/'+ imgLink;
    document.getElementsByClassName('projectInfoDescription')[0].innerHTML = description;
    projectData.link = lnk;
}

//give event listeners to divs
function addProjectFunctions(divs){
    document.getElementsByClassName('projectDarken')[0].addEventListener('click', function(){
        if(event.srcElement == document.getElementsByClassName('projectDarken')[0]){
            toggleHidden(document.getElementsByClassName('projectDarken')[0]);
        }
    })
    document.getElementsByClassName('projectInfoCross')[0].addEventListener('click', function(){
        toggleHidden(document.getElementsByClassName('projectDarken')[0]);
    })
    for(let i = 0; i < divs.length; i++){
        divs[i].addEventListener('click', function(){
            toggleHidden(document.getElementsByClassName('projectDarken')[0]);
            if(i == 0){
                addProjectInHL('Tetris', 'proj-tetris.png', 'This is my version of Tetris made with Vanilla JavaScript. The game requires a keyboard for control of pieces. The game has multiple features such as difficulty levels, previews of upcoming blocks and sound effects. I hope you enjoy playing.', 'tetris.html');
            }
            else if(i == 1){
                addProjectInHL('No-Context-Creepy', 'proj-nocontext.png', 'No Context Creepy is a website I created for my own recreational use. It retrieves random creepy stories from the askreddit website and displays them to the user if they fall under certain prerequisites. It utilizes the reddit API to work.', 'nocontext.html')
            }
            else if(i == 2){
                addProjectInHL('To-Do', 'proj-todo.png', 'My own take on creating a to-do list. This application allows the user to create as many tasks as they would like. The app has a built in favourite option and gives the user the ability to delete tasks and display different sets of tasks ie completed tasks.', 'todo.html')
            }
            else if(i == 3){
                addProjectInHL('Checkers', 'proj-checkers.png', 'A JavaScript version of the classis board game Checkers. This is a two player game and includes all the rules of checkers with multitake and forced takes implemented and the ability to see where you can move your piece to next.', 'checkers.html')
            }
            else if(i == 4){
                addProjectInHL('Wikipedia-API', 'proj-wikipedia.png', 'I created this wikipedia serch engine by utilizing the Wikipedia API. The user can search through the wikipedia database for pages and the most relevant pages will be listed with easy clickable links. There is also a random page feature.', 'wikiAPI.html')
            }
            else if(i == 5){
                addProjectInHL('Calculator', 'proj-calculator.png', 'This calculator has multiple features. It allows for the use of all four basic operators in basic arithmetic. It displays previous inputs, allows for the stringing together of multiple operations. You can use your own keypad to enter commands by clicking into the screen area.', 'calculator.html')
            }
            else if(i == 6){
                addProjectInHL('Snake', 'proj-snake.png', 'The classic game of snake remade in JavaScript. Snake follows the rules of the classic game where the player has to collect food to grow bigger while the game gets quicker. Control the snake with the arrow keys on your keyboard.', 'snake.html');
            }
            else if(i == 7){
                addProjectInHL('Platformer', 'proj-platformer.png', 'This is a simple 2d platformer which currently has three levels. It utilizes the arrow keys to move the character and space bar to jump. It requires a desktop size screen to play.', 'platformer.html');
            }
        })
    }
}


function projectLinkButtons(lnk){
    window.open(lnk, '_self');
};





//initializes the entire section
(function initProjectSec(){
    creEl('div', ['projectDiv', 'sectionMainDiv'], 'app', 0);

    creEl('div', 'projectIntro', 'projectDiv', 0);
    document.getElementsByClassName('projectIntro')[0].id="projects";
    creEl('div', ['projectTitle', 'sectionTitle'], 'projectIntro', 0, 'Projects');
    creEl('div', ['projectParagraph', 'sectionParagraph'], 'projectIntro', 0, 'You can see a selection of some of my work below.');

    creEl('div', 'projectSectionsContain', 'projectDiv', 0);

    creEl('div', ['mainProjectSection', 'projectSection'], 'projectSectionsContain', 0);
    creEl('div', ['secondProjectSection', 'projectSection', 'hidden'], 'projectSectionsContain', 0);
    creEl('div', ['thirdProjectSection', 'projectSection', 'hidden'], 'projectSectionsContain', 0);

    //Main projects section
    creProjectItem('mainProjectSection', 0, 'Tetris',  '<i class="fa fa-th-large"></i>', 'This is the classic video game tetris re-made entirely in vanilla JavaScript. It contains multiple features such as varying difficulty levels, score system etc.');
    creProjectItem('mainProjectSection', 1, 'NC-Creepy', '<i class="fab fa-reddit"></i>', 'Creepy story generator that utilized the Reddit API to provide the user with a different story each time they press a button.' )
    creProjectItem('mainProjectSection', 2, 'To-Do', '<i class="fa fa-calendar"></i>', 'A To-Do list written in pure JavaScript. This app allows the user to create items, favourite them, delete them and allows the user to cycle between different display options.');

    
    //Secondary projects section
    creProjectItem('secondProjectSection', 3, 'Checkers', '<i class="fab fa-delicious"></i>', 'My own version of Checkers created using vanilla JavaScript. It contains most of the offical rules of checkers including mandatory takes and multi-takes.' );
    creProjectItem('secondProjectSection', 4, 'Wiki-API', '<i class="fab fa-wikipedia-w"></i>', 'This is my Wikipedia search engine which utilizes the wikipedia API to bring the user back their results.');
    creProjectItem('secondProjectSection', 5, 'Calculator', '<i class="fa fa-calculator"></i>', 'A calculator with multiple features including the ability to display previous inputs and to string together numerous commands into a single equation.')
    
    //Third projects section
    creProjectItem('thirdProjectSection', 6, 'Snake', '<i class="fa fa-gamepad"></i>', 'A remake of the classic phone game snake. Snake utilizes keyboard controls and all the rules of the classic game.')
    creProjectItem('thirdProjectSection', 7, 'Platformer', '<i class="fa fa-shoe-prints"></i>', 'A 2D platformer in which the user must jump his way to victory;' );

    creEl('div', 'projectMore', 'projectDiv', 0);
    creEl('div', ['portButton','projectMoreButton'], 'projectMore', 0, 'Show More');

    creEl('div', ['projectDarken', 'hidden'], 'app', 0);
    creEl('div', 'projectInfoDiv', 'projectDarken', 0);
    creEl('div', 'projectInfoCross', 'projectInfoDiv', 0, '<i class="fa fa-times"></i>');
    creEl('div', 'projectInfoTitle', 'projectInfoDiv', 0);
    creEl('img', 'projectInfoImg', 'projectInfoDiv', 0);
    creEl('div', 'projectInfoDescription', 'projectInfoDiv', 0);
    creEl('div', ['projectInfoButton', 'portButton'], 'projectInfoDiv', 0);

    addProjectFunctions(document.getElementsByClassName('projectItemImgOver'))

    //document.getElementsByClassName('projectInfoButton')[0].addEventListener('click', function(){projectLinkButtons(projectData.link)})

    document.getElementsByClassName('projectMoreButton')[0].addEventListener('click', function(){

        if(projectData.showingMore){
            document.querySelector('.projectMoreButton').innerHTML = 'Show More';
            window.scrollTo(0, window.scrollY - document.getElementsByClassName('secondProjectSection')[0].offsetHeight);
        }else{
            document.querySelector('.projectMoreButton').innerHTML = 'Show Less';
        }
        hideDiv('secondProjectSection', 0);
        hideDiv('thirdProjectSection', 0);
        projectData.showingMore = !projectData.showingMore;

    })
})();





/* New File */




//object holds data required for functions
let contactData = {ccBlueTopPos : -100, ccBlueTopDir : 2, ccBlueTopMove : true}

//slides the contact section down into view or pushes it back up
function showContact(sec){
    if(contactData.ccBlueTopMove){contactData.ccBlueTopMove = false;}
    contactData.ccBlueTopPos = contactData.ccBlueTopPos + contactData.ccBlueTopDir;
    sec.style.top = contactData.ccBlueTopPos + '%';
    if(contactData.ccBlueTopPos < 0 &&  contactData.ccBlueTopPos > -101){
        setTimeout(function(){showContact(sec)}, 18)
    }
    else{contactData.ccBlueTopDir = -contactData.ccBlueTopDir; contactData.ccBlueTopMove = true;}
}

//gives form elements correct data to send information to formspree
function setFormData(){
    //document.getElementsByClassName('ccBlueForm')[0].action="https://formspree.io/markfitz815@gmail.com";
    //document.getElementsByClassName('ccBlueForm')[0].method="POST"
    document.getElementsByClassName('ccBlueName')[0].type="text";
    document.getElementsByClassName('ccBlueName')[0].name="name";
    document.getElementsByClassName('ccBlueName')[0].placeholder="Name";
    document.getElementsByClassName('ccBlueEmail')[0].type="email";
    document.getElementsByClassName('ccBlueEmail')[0].name="_replyto";
    document.getElementsByClassName('ccBlueEmail')[0].placeholder="Email address";
    document.getElementsByClassName('ccBlueText')[0].name="text";
    document.getElementsByClassName('ccBlueText')[0].placeholder="Tell me a little about your company and the position you feel I would be right for.";
    //document.getElementsByClassName('ccBlueSubmit')[0].type="submit";
    document.getElementsByClassName('ccBlueSubmit')[0].value="Send";
}

function shakeBox(div, size, runner){
    div.style.left= size + "px";
    runner++;
    if(runner < 8){setTimeout(function(){shakeBox(div, -size, runner)}, 80)}
    else{div.style.left="0px"}
};


//initializes contact section
(function initContactSec(){
    
    creEl('div', ['contactDiv', 'sectionMainDiv'], 'app', 0);
    creEl('div', 'contactContain', 'contactDiv', 0);
    creEl('div','contactIcon', 'contactContain', 0, '<i class="fa fa-envelope-square"></i>')
    creEl('div', 'contactTitle', 'contactContain', 0, 'Interestested in hiring me?');
    creEl('div', 'contactPara', 'contactContain', 0, "I am currently looking for new work and would be very interested to hear about your open positions. Please get in touch with me by using the button below.")
    creEl('div', ['portButton','contactButton'], 'contactContain', 0, 'Contact Me');

    creEl('div', 'contactContainBlue', 'contactDiv', 0);
    creEl('div', 'ccBlueCross', 'contactContainBlue', 0, '<i class="fa fa-times"></i>');
    creEl('div', 'ccBlueTitle', 'contactContainBlue', 0, 'Please enter your details below and I will get back to you as soon as I can.');
    creEl('form', 'ccBlueForm', 'contactContainBlue', 0);
    creEl('input', 'ccBlueName', 'ccBlueForm', 0);
    creEl('input', 'ccBlueEmail', 'ccBlueForm', 0);
    creEl('textarea', 'ccBlueText', 'ccBlueForm', 0);
    creEl('input', 'ccBlueSubmit', 'ccBlueForm', 0, 'Submit');
    
    setFormData();
    
    //adds event listeners to elements on page
    document.getElementsByClassName('contactButton')[0].addEventListener('click', function(){
        if(contactData.ccBlueTopMove){
            showContact(document.getElementsByClassName('contactContainBlue')[0]);
        }
    })
    document.getElementsByClassName('ccBlueCross')[0].addEventListener('click', function(){
        if(contactData.ccBlueTopMove){
            showContact(document.getElementsByClassName('contactContainBlue')[0]);
        }
    })
    document.getElementsByClassName('ccBlueSubmit')[0].addEventListener('click', function(event){

        if(document.getElementsByClassName('ccBlueName')[0].value.length < 1){
            event.preventDefault();
            document.getElementsByClassName('ccBlueName')[0].style.border="#d31717 2px solid";
            shakeBox(document.getElementsByClassName('ccBlueName')[0], 10, 0);
        }
        if(document.getElementsByClassName('ccBlueEmail')[0].value.length < 1){
            event.preventDefault();
            document.getElementsByClassName('ccBlueEmail')[0].style.border="#d31717 2px solid";
            shakeBox(document.getElementsByClassName('ccBlueEmail')[0], 10, 0);
        }
        if(document.getElementsByClassName('ccBlueText')[0].value.length < 1){
            event.preventDefault();
            document.getElementsByClassName('ccBlueText')[0].style.border="#d31717 2px solid";
            shakeBox(document.getElementsByClassName('ccBlueText')[0], 10, 0);
        }
    })
    document.getElementsByClassName('ccBlueName')[0].addEventListener('keydown', function(){
        this.style.border="#444 2px solid";
    })
    document.getElementsByClassName('ccBlueEmail')[0].addEventListener('keydown', function(){
        this.style.border="#444 2px solid";
    })
    document.getElementsByClassName('ccBlueText')[0].addEventListener('keydown', function(){
        this.style.border="#444 2px solid";
    })
})()





/* New File */





//creates the links to external websites in the footer
function createFooterLink(linkName,  inHL, linkDestination){
    creEl('div', ['footerLink', 'footerLink'+ linkName], 'footerLinksDiv', 0);
    creEl('div', ['footerLinkIcon', 'footerLinkIcon'+linkName], 'footerLink'+ linkName, 0, '<i class="fab fa-'+inHL+'"></i>');
    //openWebPage('footerLink'+linkName, 0, linkDestination)
}

//initializes the footer section of the wepage
(function initFooterSec(){
    creEl('div', ['footerDiv', 'sectionMainDiv'], 'app', 0);

    creEl('div', 'footerLinksDiv', 'footerDiv', 0);
    createFooterLink('Linkedin', 'linkedin', 'https://www.linkedin.com/in/mark-fitzpatrick-491419100/');
    createFooterLink('Instagram', 'instagram', 'https://www.instagram.com/fitzandshout/');
    createFooterLink('Twitter', 'twitter', 'https://twitter.com/jetsetfitz');
    createFooterLink('Github', 'github', 'https://github.com/Havolt');
    createFooterLink('Facebook', 'facebook', 'https://www.facebook.com/mark.fitzpatrick.545');
    

    creEl('div', 'copyrightDiv', 'footerDiv', 0, 'Created by me &copy; 2018');
})()




/* New File */





//function on intro main button which scrolls smoothly to the contact section
function scrollToContact(main, contact, footer){
    let totalScroll = main.offsetHeight - (contact.offsetHeight + footer.offsetHeight);
    scrollToAbout(totalScroll, 10);
}

//scrolls the user to the requested part of the site
function scrollToAbout(height, speed){
    let scrollRunner = window.scrollY;
    if((window.scrollY + window.innerHeight) > (document.getElementsByClassName('app')[0].offsetHeight - 20)){
        setTimeout(function(){showContact(document.getElementsByClassName('contactContainBlue')[0])}, 200)
    }
    else if(window.scrollY < height){
        window.scrollTo(0, scrollY + 30);
        setTimeout(function(){scrollToAbout(height, speed)}, speed)
    }
}

//toggles hiding an element on the page
function hideDiv(divClass, divNum){
    let item = document.getElementsByClassName(divClass)[divNum]
    let isHidden = false;
    for(let i = 0; i < item.classList.length; i++){
        if(item.classList[i] == 'hidden'){isHidden = true};
    }
    if(!isHidden){item.classList.add('hidden')}
    else{item.classList.remove('hidden')}
}

//initialized the general functions needed on the page
(function initGen(){
    document.getElementsByClassName('intMoreContain')[0].addEventListener('click', function(){
        setTimeout(function(){scrollToAbout(window.innerHeight, 30)}, 30);})
    document.getElementsByClassName('intButton')[0].addEventListener('click', function(){
        scrollToContact(document.getElementsByClassName('app')[0], document.getElementsByClassName('contactDiv')[0], document.getElementsByClassName('footerDiv')[0])})
})()

