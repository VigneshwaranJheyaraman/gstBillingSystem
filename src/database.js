import Dexie from "dexie";

const dataBase = new Dexie("customerproductdb");
//dataBase.delete();
dataBase.version(1).stores(
    {
        product : "++prodid, pName, pGst, pPrice",
        customer : '++custid, custName, *purchase'
    }
);
dataBase.version(2).stores(
    {
        purchase: '++purid, product, qty'
    }
);
dataBase.product.clear().then(() => {console.log("Database for products creating...")});
dataBase.product.bulkPut([
    {pName:"Apple",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Cauliflower",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Strawberry",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Screw driver",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Plum",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Potatot",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Beans",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Carrot",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Cabbage",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Spinach",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Lemon",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Mosambi",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Kiwi",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Guava",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Mango",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Pineapple",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Orange",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Temporary Marker",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Diary Milk Silk",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
    {pName:"Cornflakes",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.round(Math.random() * 50 + 50)/100},
]);
dataBase.customer.clear().then(() => {console.log("Database for customer creating...")});
dataBase.customer.bulkPut([
    { custName: "customer1", purchase : []},
    { custName: "customer2", purchase : []},
    { custName: "customer3", purchase : []},
    { custName: "customer4", purchase : []}
])
//,customer : "++id, custName *productIds"
export default dataBase;