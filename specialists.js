Specialists = {

    elements: {
        ul: document.querySelector("ul"),
        titleList: [],
        descriptionList: [],
        mixList: [],
        imgList: [],
        linkList: [],
        zip: "",
        providers: "",
        specialty: ""
    },

    helpers: {

        receiveData: function(){

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            Specialists.elements.specialty = urlParams.get('specialty');
            Specialists.elements.providers = urlParams.get('providers');
            Specialists.elements.zip = urlParams.get('location');
            fetch(`http://127.0.0.1:5000/yelp-doctors?specialist=${Specialists.elements.specialty}&location=${Specialists.elements.zip}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    let res = data.businesses;
                    res.map((bis) => {
                        Specialists.elements.imgList.push(bis.image_url);
                        Specialists.elements.linkList.push(bis.url);
                        Specialists.elements.titleList.push(bis.name);
                        let locInfo = bis.location.city + ", " + bis.location.state + " " + bis.location.zip_code;
                        Specialists.elements.descriptionList.push(locInfo);
                    })
                })
            console.log(Specialists.elements.titleList);
        },

        createMixList: function(){
            for(let i = 0; i < Specialists.elements.titleList.length; i++){
                Specialists.elements.mixList.push(Specialists.elements.titleList[i]);
                Specialists.elements.mixList.push(Specialists.elements.descriptionList[i]);
            }
            console.log(Specialists.elements.mixList);
        },

        generateList: function(){
            console.log("generating list");
            for(let i=0; i< Specialists.elements.mixList.length; i+=2){
                Specialists.helpers.createCard(Specialists.elements.mixList[i], Specialists.elements.mixList[i+1], Specialists.elements.imgList[i/2], Specialists.elements.linkList[i/2]);
            }
        },

        createCard: function(title, description, image, link){
            li = document.createElement("li");
            h2 = document.createElement("h2");
            p = document.createElement("p");
            img = document.createElement("img")
            butt = document.createElement("button");
            buttImg = document.createElement("img");
            container = document.createElement("div");
            
            const newURL = new URL(link);
        
            img.setAttribute("src", image);
            butt.setAttribute("onclick", "window.location.href='"+ newURL +"'");
            buttImg.setAttribute("src", "assets/link-button.png");

            h2.textContent = title;
            p.textContent = description;

            butt.appendChild(buttImg);
            
            li.append(img);
            container.appendChild(h2);
            container.appendChild(p);
            li.appendChild(container);
            li.appendChild(butt);

            Specialists.elements.ul.appendChild(li);
        },

    },

    main: function() {
    /*
        Specialists.helpers.receiveData();
        Specialists.helpers.createMixList();
        Specialists.helpers.generateList();
     */
        Specialists.helpers.receiveData();
        setTimeout(Specialists.helpers.createMixList, 4000)
        setTimeout(Specialists.helpers.generateList, 5000)

    },

};

Specialists.main();