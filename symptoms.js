const SymptomPage = {

    elements: {
        symptoms: document.querySelector("#add-symptoms"),
        providers:  document.querySelector("#add-providers"),
        zip: document.querySelector("#add-zip"),
        ul: document.querySelector("ul"),
        submit: document.querySelector("#submit"),
        providerList: [],
        zipList: [],
    },

    handlers: {
        addListItem: function() {
            li = document.createElement("li");
            li.textContent = SymptomPage.elements.providers.value;
            SymptomPage.elements.ul.prepend(li);
        },

        addZipItem: function() {
            lz = document.createElement("li");
            lz.textContent = SymptomPage.elements.zip.value;
            SymptomPage.elements.ul.prepend(lz);
        },

        onEnterPressed: function(event){
            
            if(event.key === "Enter"){
                event.preventDefault();
                console.log(SymptomPage.elements.providers.value);
                SymptomPage.elements.providerList.push(SymptomPage.elements.providers.value);
                SymptomPage.handlers.addListItem();
                SymptomPage.elements.providers.value = "";
                return false;
            }

        },

        onEnterPressedZip: function(event){

            if(event.key === "Enter"){
                event.preventDefault();
                console.log(SymptomPage.elements.zip.value);
                SymptomPage.elements.zipList.push(SymptomPage.elements.zip.value);
                SymptomPage.handlers.addZipItem();
                SymptomPage.elements.zip.value = "";
                return false;
            }

        },

        submitButtonClick: function(event){

            let val = SymptomPage.elements.symptoms.value;
            val = val.replace(/ /g,"_");
            
            console.log(SymptomPage.elements.providerList);
            console.log(SymptomPage.elements.zipList);

            console.log(JSON.stringify(val));
        }

    },

    main: function() {
        SymptomPage.elements.providers.addEventListener("keydown", SymptomPage.handlers.onEnterPressed)
        SymptomPage.elements.zip.addEventListener("keydown", SymptomPage.handlers.onEnterPressedZip)
        SymptomPage.elements.submit.addEventListener("click", SymptomPage.handlers.submitButtonClick)
    },

};

SymptomPage.main();