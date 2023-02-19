Specialties = {

    elements: {
        ul: document.querySelector("ul"),
        titleList: ["Title1", "Title2", "Title3"],
        descriptionList: ["Description1", "Description2", "Description3"],
        mixList: [],
    },

    helpers: {

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

            h2.textContent = title;
            p.textContent = description;

            li.appendChild(h2);
            li.appendChild(p);
            li.addEventListener("click", clickSpecialty = function(event){

                console.log(li.h2.value);

            });

            Specialties.elements.ul.appendChild(li);
        }

    },

    main: function() {
        Specialties.helpers.createMixList();
        Specialties.helpers.generateList();
    },

};

Specialties.main();