var express = require('express');
var router = express.Router();

var axios = require('axios');
const { urlencoded } = require('express');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/payment/ready', async (req, res, next) =>{

  let data = {}
  
  const parameter = {
      'cid':req.body.cid,
			'partner_order_id': req.body.partner_order_id,
			'partner_user_id' : req.body.partner_user_id,
		  'item_name': req.body.item_name,
			'quantity': req.body.quantity,
			'total_amount': req.body.total_amount,
			'vat_amount': req.body.vat_amount,
			'tax_free_amount': req.body.tax_free_amount,
			'approval_url': req.body.approval_url, 
			'fail_url': req.body.fail_url,
			'cancel_url': req.body.cancel_url
  }

  
  await axios({url: 'https://kapi.kakao.com/v1/payment/ready', 
    method:"POST",
    params: parameter,
    headers:{
      Authorization: 'KakaoAK af037774607b4eae3d804398e9da7b58',
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
    .then((response) => {
      data = response.data
    })
    .catch(error =>{
      console.log(error);
    })
    return res.json(data)
})



router.post('/payment/approve',async (req, res, next) =>{
  
  let data = {}

  const parameter = {
      'cid':req.body.cid,
			'tid': req.body.tid,
      'partner_order_id':req.body.partner_order_id,
			'partner_user_id' : req.body.partner_user_id,
		  'pg_token':req.body.pg_token,
  }

  
  await axios({url: 'https://kapi.kakao.com/v1/payment/approve', 
    method:"POST",
    params: parameter,
    headers:{
      Authorization: 'KakaoAK af037774607b4eae3d804398e9da7b58',
      }
    })
    .then((response) => {
      data = response.data
      console.log("approve data",data);
    })
    .catch(error =>{
      console.log(error);
    })
 
  return res.json(data)
})

module.exports = router;

