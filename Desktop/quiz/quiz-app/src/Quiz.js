import React, { useState } from 'react'

function Quiz(props) {

  const [사용자답, set사용자답] = useState("");
  const [힌트, set힌트] = useState("");

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

  function 힌트함수(){
    set힌트(props.힌트)
  }

  return (
    <div className="wrap">
      <h2 dangerouslySetInnerHTML={{ __html: props.질문 }}></h2>
      <div className="feedback" style={{ marginTop: '10px',marginBottom : '10px' }}>
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
        <button style={{marginLeft:"10px"}} className='submitBtn' type='submit' onClick={힌트함수}>힌트</button>

        <div>실시간 점수판 : {props.점수} </div>
        <div>남은시간 : {props.타이머}초</div>
      </div>
    </div>
  )
}


export default Quiz;