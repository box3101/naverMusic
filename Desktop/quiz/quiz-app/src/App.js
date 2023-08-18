import { useEffect, useState } from 'react';
import './App.css';
import Quiz from './Quiz';
import 퀴즈들 from './data';

function App() {
  const [현재퀴즈idx, set현재퀴즈] = useState(0);
  const [점수, set점수] = useState(0);
  const [타이머, set타이머] = useState(1000000);
  const [무작위배열, set무작위배열] = useState([]);

  useEffect(() => {
    const 복사된퀴즈들 = [...퀴즈들];
    const 무작위배열 = [];
    while (복사된퀴즈들.length > 0) {
      const 랜덤 = Math.floor(Math.random() * 복사된퀴즈들.length);
      const 뽑은값 = 복사된퀴즈들.splice(랜덤, 1);
      const 값 = 뽑은값[0];
      무작위배열.push(값);
    }
    set무작위배열(무작위배열);

  }, [])

  useEffect(() => {
    let 타이머멈춤 = setInterval(function () {
      set타이머(이전타이머 => 이전타이머 - 1);
    }, 1000);

    if (타이머 <= 0) {
      clearInterval(타이머멈춤);
      set현재퀴즈(현재idx => 현재idx + 1);
      set타이머(1000000);
    }
    //이전에 실행되던 setInterval을 멈추기 위해 필요
    return () => {
      clearInterval(타이머멈춤);
    }
  }, [타이머]);

  return (
    <div className="App">
      {
        현재퀴즈idx < 무작위배열.length
          ? <Quiz 현재퀴즈idx={현재퀴즈idx} 퀴즈인덱스={set현재퀴즈} 질문={무작위배열[현재퀴즈idx].질문} 선택지={무작위배열[현재퀴즈idx].선택지} id={무작위배열[현재퀴즈idx].id} 정답={무작위배열[현재퀴즈idx].정답} 점수={점수} set점수={set점수} 타이머={타이머} set타이머={set타이머} 힌트={무작위배열[현재퀴즈idx].힌트} />
          :
          <>
            <div> 최종점수 : {점수} </div>
            <div>
              <button onClick={() => {
                set현재퀴즈(0);
                set점수(0);
              }}>처음부터 다시 풀기</button>
            </div>
          </>
      }
    </div>
  );
}

export default App;
