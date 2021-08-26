const express=require('express');
const request = require('request-promise');
const app =express();
const PORT=process.env.PORT||3000;
const apiKey='9bbc8c781afbe986118e5bbe9575ec41';
const baseUrl=`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome to amazon web scraper API');
})
//Get product reviews from productId
app.get('/products/:productId',async(req,res)=>{
    const {productId} = req.params;
    try {
        const response=await request(`${baseUrl}&url=https://amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
        
    } catch (error) {
        res.json(error);
    }
})
//Get customer reviews from productId 
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId} = req.params;
    try {
        const response=await request(`${baseUrl}&url=https://amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
        
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT,()=>{
    console.log(`The Server is running on port no ${PORT}`);
});