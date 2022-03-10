
import axios from 'axios'
import { useEffect, useState } from 'react';
import getQuery from './utils/getQuery.js';


function PaymentResultPage() {
  
  // componentDidMount
  useEffect(()=>{

    // getQuery - 브라우저 url의 쿼리스트링을 가져오는 함수
    const result = getQuery(window.location.search)
    
    if(result.pg_token && window.localStorage.getItem("tid")){
      
      // 모바일에서 결제 완료 후
      // 결제 승인을 위해 홈트결제API(/payment/approve) 호출 
      axios({
        method:"POST",
        url:'/payment/approve',
        data: {
          pg_token : result.pg_token,
          tid : window.localStorage.getItem("tid"),
          'cid':'TC0ONETIME',
          'partner_order_id': 'partner_order_id',
          'partner_user_id' : 'partner_user_id',
        },
        headers:{ withCredentials: true }
      })
      .then(response =>{

        window.localStorage.removeItem('tid')
      })
    }
  
  },[])


  return (
    <div>
      <div style={{display:'flex',justifyContent:'center', background:'yellow', margin:'50px'}}>
          
          <div>결제 완료 Page</div>    

      </div>
    </div>
      

 
  );
}

export default PaymentResultPage;
