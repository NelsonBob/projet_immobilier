


const MarketPlace = artifacts.require("MarketPlace");

contract("MarketPlace", accounts => {
    let marketPlace;

    beforeEach(async () => {
        marketPlace = await MarketPlace.new();
    });

    it("should create an apartment successfully", async () => {
        const title = "My Apartment";
        const name = "Apartment 1";
        const description = "This is a great apartment";
        const deadline = Math.floor(Date.now() / 1000) + 100000;
        const image = "imageurl.com";
        const amountappartment = 100;

        await marketPlace.createApartment(accounts[0], title, name, description, amountappartment,deadline, image);
        const result = await marketPlace.getApartments();
        assert.equal(result.length, 1, "number of apartments is not correct");
        assert.equal(result[0].owner, accounts[0], "owner is not correct");
        assert.equal(result[0].title, title, "title is not correct");
        assert.equal(result[0].name, name, "name is not correct");
        assert.equal(result[0].amountappartment, amountappartment, "amountappartment is not correct");
        assert.equal(result[0].description, description, "description is not correct");
        assert.equal(result[0].deadline.toString(), deadline.toString(), "deadline is not correct");
        assert.equal(result[0].image, image, "image is not correct");
    });

    

    it("should get all apartments successfully", async () => {
        const title = "My Apartment";
        const name = "Apartment 1";
        const description = "This is a great apartment";
        const deadline = Math.floor(Date.now() / 1000) + 100000;
        const image = "imageurl.com";
        const amountappartment = 100;
        await marketPlace.createApartment(accounts[0], title, name, description, amountappartment, deadline, image);
        const result = await marketPlace.getApartments();
        assert.equal(result.length, 1, "number of apartments is not correct");
        assert.equal(result[0].owner, accounts[0], "owner is not correct");
        assert.equal(result[0].title, title, "title is not correct");
        assert.equal(result[0].name, name, "name is not correct");
        assert.equal(result[0].amountappartment, amountappartment, "amountappartment is not correct");
        assert.equal(result[0].description, description, "description is not correct");

        assert.equal(result[0].deadline.toString(), deadline.toString(), "deadline is not correct");
        assert.equal(result[0].image, image, "image is not correct");
        });
});