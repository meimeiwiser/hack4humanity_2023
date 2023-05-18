Specialties = {

    elements: {
        loader: document.querySelector(".loading"),
        ul: document.querySelector("ul"),
        titleList: [],
        descriptionList: [],
        mixList: [],

        symptoms: "",
        providers: "",
        zip: "",
    },

    helpers: {

        receiveData: function () {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            Specialties.elements.symptoms = urlParams.get('symptoms');
            Specialties.elements.providers = urlParams.get('providers');
            Specialties.elements.zip = urlParams.get('zips');

            //call here!
            fetch(`http://127.0.0.1:5000/departments?symptoms=${spacedTextToDashed(Specialties.elements.symptoms)}`)
                .then((response) => response.json())
                .then((data) => {
                    Specialties.elements.titleList = data.departments;
                    Specialties.elements.descriptionList = data.definitions;
                    //console.log(Specialties.elements.titleList);
                    //console.log(Specialties.elements.descriptionList);
                })

        },

        createMixList: function(){
            for(let i = 0; i < Specialties.elements.titleList.length; i++){
                Specialties.elements.mixList.push(Specialties.elements.titleList[i]);
                Specialties.elements.mixList.push(Specialties.elements.descriptionList[i]);
            }
            console.log(Specialties.elements.mixList);
        },

        generateList: function(){
            console.log("generating list");
            for(let i=0; i< Specialties.elements.mixList.length; i+=2){
                Specialties.helpers.createCard(Specialties.elements.mixList[i], Specialties.elements.mixList[i+1]);
            }
        },

        createCard: function(title, description){
            li = document.createElement("li");
            h2 = document.createElement("h2");
            p = document.createElement("p");
            butt = document.createElement("button");
            buttImg = document.createElement("img");

            const baseURL = new URL('specialties.html'); //TODO: Change for your instance
            const addition = `?specialty=${title}&location=${Specialties.elements.zip}`;
            newURL = new URL(addition, baseURL);
            //const newURL = new URL(title, baseURL);

            //console.log(JSON.stringify(newURL));

            //Give the button a link that will take to new page on click
            //butt.setAttribute("onclick", "window.location.href='file:///Users/liamahearn/Desktop/H4H2023/hack4humanity_2023/sutter.html'");
            butt.setAttribute("onclick", "window.location.href='"+ newURL +"'");

            buttImg.setAttribute("src", "assets/link-button.png");
            h2.textContent = title;
            p.textContent = description;

            //testing new event listener / url
            //butt.addEventListener("click", linkFunction);

            butt.appendChild(buttImg);

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(butt);

            //ul is being read as NULL
            console.log(Specialties.elements.ul);

            Specialties.elements.ul.appendChild(li);
        },

        linkFunction: function(obj) {
            const baseURL = new URL('file:///Users/brianwiebe/Desktop/H4H ToDo/BACKUP');
            const newURL = new URL(title, baseURL);
        },
        
        revealContent: function(){
            Specialties.elements.loader.remove();
        },


        revealContent: function(){
            Specialties.elements.loader.remove();
        },


    },

    main: function() {

        Specialties.helpers.receiveData();

        //Specialties.helpers.createMixList();
        //Specialties.helpers.generateList();

<<<<<<< Updated upstream
        setTimeout(Specialties.helpers.createMixList, 15000);
        setTimeout(Specialties.helpers.generateList, 15000);
        setTimeout(Specialties.helpers.revealContent, 15000);
=======
        setTimeout(Specialties.helpers.createMixList, 20000);
        setTimeout(Specialties.helpers.generateList, 20000);
        setTimeout(Specialties.helpers.revealContent, 20000);
>>>>>>> Stashed changes
    },

};

function spacedTextToDashed(text){
    let textSplit = text.split();
    for(let i = 0; i<textSplit.length; i++){
        if(textSplit[i] === ' '){
            textSplit[i] = '_'
        }
    }
    let combinedText = textSplit.join();
    console.log(combinedText);
    return combinedText;
}

Specialties.main();
