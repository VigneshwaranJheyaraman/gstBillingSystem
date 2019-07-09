import Dexie from "dexie";

const dataBase = new Dexie("customerproductdb");
//dataBase.delete();
dataBase.version(1).stores(
    {
        product : "prodid, pName, pGst, pPrice",
        customer : 'custid, custName, *purchase'
    }
);
dataBase.version(2).stores(
    {
        purchase: '++purid, product, qty, pid'
    }
);
dataBase.product.bulkPut([
    {prodid:1,pName:"Apple",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:2,pName:"Cauliflower",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:3,pName:"Strawberry",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:4,pName:"Screw driver",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:5,pName:"Plum",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:6,pName:"Potatot",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:7,pName:"Beans",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:8,pName:"Carrot",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:9,pName:"Cabbage",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:10,pName:"Spinach",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:11,pName:"Lemon",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:12,pName:"Mosambi",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:13,pName:"Kiwi",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:14,pName:"Guava",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:15,pName:"Mango",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:16,pName:"Pineapple",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:17,pName:"Orange",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:18,pName:"Temporary Marker",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:19,pName:"Diary Milk Silk",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
    {prodid:20,pName:"Cornflakes",pGst: Math.floor(Math.random() * 1 + 3), pPrice:Math.floor(Math.random() * 50 + 50)},
]);/* 
dataBase.customer.bulkPut([
    { custid:1,custName: "customer1", purchase : []},
    { custid:2,custName: "customer2", purchase : []},
    { custid:3,custName: "customer3", purchase : []},
    { custid:4,custName: "customer4", purchase : []}
]) */
//,customer : "++id, custName *productIds"
export default dataBase;