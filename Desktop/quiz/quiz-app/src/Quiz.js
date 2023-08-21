import React, { useEffect, useState } from 'react'

function Quiz(props) {


  // 로컬스트리지 데이터 수정 방법
  // 1. 원하는 키의 현재 값을 가져온다.
  // 2. 그 값을 원하는 대로 수정한다.
  // 3. 수정된 값을 해당 키에 다시 저장한다. 

  const [사용자답, set사용자답] = useState("");
  const [힌트, set힌트] = useState("");
  const [피드백, set피드백] = useState("");


  function 해당값저장(e) {
    set사용자답(e.target.value);
  }

  function 정답체크() {
    // 라디오버튼 선택 상태를 초기화
    const listItemInput = document.querySelectorAll('.list-item input');
    listItemInput.forEach((input) => {
      input.checked = false;
    });

    props.퀴즈인덱스(props.현재퀴즈idx + 1); // 다음 문제로 넘어가기
    set힌트("");
    props.set타이머(1000000);

    if (사용자답 === props.정답) {
      props.set점수(props.점수 + 1);
    } else {
    }
  }
  function 힌트함수() {
    힌트 == "" ? set힌트(props.힌트) : set힌트("")
  }


  function 피드백제출() {
    const 피드백값 = document.querySelector(".feedback-input").value;
    const 저장된피드백 = localStorage.getItem("피드백");
    const 피드백목록 = 저장된피드백 ? JSON.parse(저장된피드백) : [];
    피드백목록.push(피드백값);
    localStorage.setItem("피드백", JSON.stringify(피드백목록));
  }

  // 1. "피드백" 키의 값을 localStorage에서 가져옵니다 가져온 값을 JavaScript 배열로 변환
  let 피드백배열 = JSON.parse(localStorage.getItem("피드백"));

  useEffect(()=>{
    console.log(피드백배열);
  },[])

  function 피드백삭제(idx) {
    // 2. 배열의 idx 항목을 삭제
    피드백배열.splice(idx, 1);
    // 3. 수정된 배열을 다시 문자열로 변환하고 localStorage에 저장
    localStorage.setItem("피드백", JSON.stringify(피드백배열));
  }



  return (
    <div className="wrap">
      <h2 dangerouslySetInnerHTML={{ __html: props.질문 }}></h2>
      <div className="feedback" style={{ marginTop: '10px', marginBottom: '10px' }}>
        {힌트}
      </div>
      <div>

      </div>

      <div className="list">
        <div className="list-item">
          {
            props.선택지.map(function (el, idx) {
              return (
                <label key={idx} >
                  <input type="radio" name={props.id} value={props.선택지[idx]} onChange={해당값저장} />{props.선택지[idx]}
                </label>
              )
            })
          }
        </div>
        <button className='submitBtn' type='submit' onClick={정답체크}>제출</button>
        <button style={{ marginLeft: "10px" }} className='submitBtn' type='submit' onClick={힌트함수}>힌트</button>

        <div>실시간 점수판 : {props.점수} </div>
        <div>남은시간 : {props.타이머}초</div>

        <div>
          피드백 : <input type="text" className="feedback-input" />
          <button type='submit' onClick={피드백제출}>제출</button>
        </div>

        <div>
          피드백 내용 :
          <ul>
            {
              피드백배열.map(function (el, idx) {
                return (
                  <li key={idx}>
                    {el}
                    <button type="button">수정</button>
                    <button type="button" onClick={()=>피드백삭제(idx)}>삭제</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Quiz;