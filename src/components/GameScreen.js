import { useEffect, useRef, useState } from "react";
import {dictionaty} from "../api/dictionaty.js";

const GameScreen = ({startWord}) => {
  const bottomRef = useRef(null);
  const [words,setWords] = useState([startWord]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // words에 배열이 변경될 때마다 bottomRef객체로 이동
  useEffect(()=>{
    if( bottomRef.current ){
      bottomRef.current.scrollIntoView({behavior:"smooth"});
    }
  }, [words])

  const addWord = (text)=>{
    setWords((prev)=>{return [...prev,text]});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
  // 사용자에게 값을 입력을 받으면 공백 제거
  const userWord = input.trim();
  if( !userWord ) return;
  // 마지막 글자와 같은지 비교
  // words의 마지막 단어의 마지막 글자 === userWord의 첫 번째 글자
  const lastWord = words[words.length-1];
  if( userWord[0] !== lastWord[lastWord.length-1] ){
    alert( `${lastWord[lastWord.length-1]}로 시작해야 합니다` );
    setInput('');
    return;
  }

  // 사용자가 입력된 단어를 추가
    addWord(userWord);
    setInput('');
    setLoading(true);

  // 1초 후에 API를 호출
  setTimeout(async ()=>{
    const lastChar = userWord[userWord.length-1];
    const word = await dictionaty(lastChar);
    if( word ){
      addWord(word);
    } else {
      alert("ai가 단어를 찾지 못했습니다")
    }
    setLoading(false);
    inputRef.current.forcus();
  },1000);
}

  return (
    <div className="game-screen">
      <h2>Hello, I'AM 말잇쮸</h2>
      <ul className="word-list">
        {
          words.map((item,idx)=>{
            return <li key={idx}><span>◐</span><span>{item}</span></li>;
          })
        }
      <li ref={bottomRef}></li>
      </ul>

      {
        loading && <p className="loading">ai가 단어를 고민 중입니다...</p>
      }   
      <form className="game-form" onSubmit={handleSubmit}>
        <input 
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
        />
        <button type="submit">▶</button>
      </form>    
    </div>
  );
};

export default GameScreen;