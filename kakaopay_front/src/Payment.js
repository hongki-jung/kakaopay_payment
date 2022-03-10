// import logo from './logo.svg';
// import './App.css';
import kakaopayLogo from './payment_icon_yellow_medium.png'
import axios from 'axios'
import { useEffect, useState } from 'react';
import getQuery from './utils/getQuery.js';


function Payment() {
  
  // 결제버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {

    // 결제 준비를 위해 홈트결제API(/payment/ready) 호출
    axios({
      method:"POST",
      url:'/payment/ready',
      data:{
        'cid':'TC0ONETIME',
        'partner_order_id': 'partner_order_id',
        'partner_user_id' : 'partner_user_id',
        'item_name':'초코파이',
        'quantity': 1 ,
        'total_amount':5000,
        'vat_amount':200 ,
        'tax_free_amount':0 ,
        'approval_url':"http://localhost:3000/payresult", 
        'fail_url':"http://localhost:3000/payresult",
        'cancel_url':'http://localhost:3000/payresult'
      },
      headers:{ withCredentials: true }
    })
    .then(response => {
      setTid(response.data.tid)
      setRedirectUrl(response.data.next_redirect_pc_url)
      
      // tid는 홈트결제승인API(/payment/approve) 호출에 필요하여 저장해놓습니다
      window.localStorage.setItem("tid", response.data.tid)

      // 결제 준비를 위해 홈트결제API(/payment/ready) 의 결과값으로 받아온 
      // next_redirect_pc_url로 화면 전환
      // 해당 화면에서 카톡 결제를 위한 휴대폰 번호,생년월일 입력 (or QR결제)
      window.location.assign(response.data.next_redirect_pc_url)
    })
  }


  return (
    <>
      <div>
      <div style={{margin:'50px'}}>
          <div style={{marginBottom:'30px'}}>카카오페이 결제 Page</div>
          <div>상품명: 초코파이</div>  {/** 보여주기용 데이터 */}  
          <div>가격 : 5000원 </div>
          <div>수량: 1개 </div>
          
          <button onClick={handleSubmit}>
            <img src={kakaopayLogo}></img>
          </button>
        </div>

      </div>
    </>
      

 
  );
}

export default Payment;
