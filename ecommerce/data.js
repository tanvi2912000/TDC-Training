const portfolio_data = [
    {
        "imageSrc": "images/i5.webp",
        "title": "New Collections",
        "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "price": "1200",
        "link": "#",
        "discount": "30%"
    },
    {
        "imageSrc": "images/i6.webp",
        "title": "Sweatshirts",
        "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "price": "1590",
        "link": "#",
        "discount": "20%"
    },
    {
        "imageSrc": "images/i7.webp",
        "title": "One Piece",
        "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "price": "1270",
        "link": "#",
        "discount": "40%"
    },
    {
        "imageSrc": "images/i8.webp",
        "title": "Spring Top",
        "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "price": "1890",
        "link": "#",
        "discount": "50%"
    },
    {
        "imageSrc": "images/i5.webp",  // Corrected image source
        "title": "Dresses",
        "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "price": "1250",
        "link": "#",
        "discount": "30%"
    },
    {
        "imageSrc": "images/i9.webp",
        "title": "Gowns",
        "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
        "price": "12000",
        "link": "#",
        "discount": "20%"
    }
];

const content1_data = [
    {
        "imageSrc": "images/i7.jpg",
        "heading": "Content",
        "description": "Whether it’s a special occasion or black is all you wear every day, a great black outfit calls for a selfie! And a great caption to go with it! There are so many ways to make a picture look great when you’re wearing black – posing against a white wall, posing against a colorful backdrop, or in a lush green garden or getting all monochromatic on a grey street."
    },
    {
        "imageSrc": "images/g11.jpg",
        "heading": "Content",
        "description": "Whether it’s a special occasion or black is all you wear every day, a great black outfit calls for a selfie! And a great caption to go with it! There are so many ways to make a picture look great when you’re wearing black – posing against a white wall, posing against a colorful backdrop, or in a lush green garden or getting all monochromatic on a grey street."
    }
];

const carousel = [
    {
        "imageSrc": "images/i1.jpg",
    },
    {
        "imageSrc": "images/i2.jpg",
    },
    {
        "imageSrc": "images/i3.jpg",
    }
];

function populatePortfolioSection() {
    const portfolioSection = document.getElementById('portfolioSection');
    portfolio_data.forEach(item => {
        const cardHtml = `
            <div class="col-sm-3 mb-4 ms-3">
                <div class="card border-0 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                    <img src="${item.imageSrc}" class="card-img-top" style="height: 100%;">
                    <div class="card-body">
                        <h5 class="card-title text text-danger">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <a href="${item.link}" class="btn btn-danger">Go somewhere</a>
                    </div>
                </div>
            </div>
        `;
        portfolioSection.innerHTML += cardHtml;
    });
}

function populateContentSections() {
    const content1Section = document.getElementById('content1');
    const content2Section = document.getElementById('content2');
    for (let i = 0; i < content1_data.length; i++) {
        const item = content1_data[i];
        if (i % 2 == 0) {
            const contentHtml1 = `
                <div class="col-md-6">
                    <img src="${item.imageSrc}" style="height: 100%; width: 100%;">
                </div>
                <div class="col-md-6">
                    <h1 class="mt-5 fw-bold text-center text text-danger">${item.heading}</h1>
                    <p class="text-center mt-5">${item.description}</p>
                </div>
            `;
            content1Section.innerHTML += contentHtml1;
        } else {
            const contentHtml2 = `
                <div class="col-md-6">
                    <h1 class="mt-5 fw-bold text-center text text-danger">${item.heading}</h1>
                    <p class="text-center mt-5">${item.description}</p>
                </div>
                <div class="col-md-6">
                    <img src="${item.imageSrc}" style="height: 100%; width: 100%;">
                </div>
            `;
            content2Section.innerHTML += contentHtml2;
        }
    }
}

function calculateDiscountedPrice(price, discount) {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
}

function populateSearching() {
    const searchInput = document.getElementById("searchBar");
    const resultsContainer = document.getElementById("searchResults");
    const body = document.body;

    searchInput.addEventListener("keyup", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = portfolio_data.filter((item) => {
            for (const key in item) {
                const value = item[key];
                if (typeof value === "string" && value.toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }
            return false;
        });

        resultsContainer.innerHTML = "";

        if (filteredData.length > 0) {
            filteredData.forEach(item => {
                const discountedPrice = calculateDiscountedPrice(item.price, parseInt(item.discount));
                const resultItem = `
                    <div class="col-sm-3 mb-4 ms-3">
                        <div class="card border-0 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                            <img src="${item.imageSrc}" class="card-img-top" style="height: 100%;">
                            <div class="card-body">
                                <h5 class="card-title text text-danger">${item.title}</h5>
                                <p class="card-text">${item.description}</p>
                                <h5 class="card-text">${item.price} Rs</h5>
                                <p class="card-text">Discounted Price: ${discountedPrice.toFixed(2)} Rs</p>
                                <a href="${item.link}" class="btn btn-danger">Shop Now</a>
                            </div>
                        </div>
                    </div>`;
                resultsContainer.innerHTML += resultItem;
            });

           
            body.classList.remove("hidden");
        } else {
            
            body.classList.add("hidden");
           
            populateContentSections();
        }
    });
}

function populateOfferSection() {
    const offerSection = document.getElementById('offerSection');

    if (!offerSection) {
        return;
    }

    portfolio_data.forEach(item => {
        // Calculate discounted price for the current item
        const discountedPrice = calculateDiscountedPrice(parseFloat(item.price), parseInt(item.discount));

        const offerHtml = `
            <div class="col-md-3 ms-3">
                <div class="card border-0 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                    <img src="${item.imageSrc}" class="card-img-top" style="height: 100%;">
                    <div class="card-body">
                        <h5 class="card-title text text-danger">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <h5 class="card-text"><del>${item.price} Rs </del></h5>
                        <p class="card-text">Discounted Price: ${discountedPrice.toFixed(2)} Rs</p>
                        <a href="${item.link}" class="btn btn-danger">Shop Now</a>
                    </div>
                </div>
            </div>
        `;
        offerSection.innerHTML += offerHtml;
    });
}

// Call the functions to populate respective sections
populatePortfolioSection();
populateContentSections();
populateSearching();
populateOfferSection();




// random

