const Router = require('koa-router');
const router = new Router();
const axios = require('axios');

router.get('/getcurrency',async (ctx) => {
   const url = `https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${formatDate()}&end_period=${formatDate()}`
   const header ={ headers: {'x-ibm-client-id': '31781ad3-b7bf-49ed-9f6a-98eb0570c436'}}
   try {
      let currency = await axios.get(url,header)
      let data = currency.data.result.data.data_detail
      ctx.status = 200;
      ctx.body = data;
   } catch (error) {
      console.log(error);
   }
});

router.post('/exchangemoney',async (ctx)=> {
   let sum = 0,
   req = ctx.request
   money = req.body.money,
   exchange = req.body.ex1
   try {
     const url = `https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${formatDate()}&end_period=${formatDate()}&currency=${exchange}`
     const header ={ headers: {'x-ibm-client-id': '31781ad3-b7bf-49ed-9f6a-98eb0570c436'}}
     const currency = await axios.get(url,header)
     let data = currency.data.result.data.data_detail[0]
     sum = (money/data.mid_rate)
     ctx.status = 200
     ctx.body = {sum:`${formatCurrency(sum)} ${data.currency_id}`}
   } catch (error) {
     console.log(error);
   }
 })

function formatCurrency(number) {
   number = parseFloat(number);
   return number.toFixed(2).replace(/./g, function(c, i, a) {
       return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
   });
 }
 
 function formatDate() {
   var d = new Date(),
       month = '' + (d.getMonth() + 1),
       day = '' + (d.getDate()-1),
       year = d.getFullYear();
 
   if (month.length < 2) 
       month = '0' + month;
   if (day.length < 2) 
       day = '0' + day;
 
   return [year, month, day].join('-');
 }

module.exports = router;