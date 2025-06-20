
export const dictionaty = async (startChar) => {
  const API_KEY="5CE76C8B4C3B76D978FC89B0B262990B";
  const base = "https://opendict.korean.go.kr/api/search";
  const params = new URLSearchParams({
    key: API_KEY,
    q: startChar,
    req_type: "json",
    part: "word",
    advanced: "y",
    sort: "popular",
    num: "20",
    pos: "1",        // 명사
    method: "start", // 시작 글자
    target: "1",      // 표제어
    type1:"word"
  });

  const originURL = `${base}?${params.toString()}`;
  console.log( originURL );
  // const proxyURL = `https://corsproxy.io/?${encodeURIComponent(originURL)}`;
  const proxyURL = originURL;
  try{
    const res = await fetch(proxyURL);
    if( !res.ok ){
      throw new Error("API 응답 오류", res.status );
    }
    const data = await res.json();
    // 조건 : 하이픈이 없고, 2글자 이상
    const filterData = data.channel.item.filter((item)=>{
      return !item.word.includes('-') && item.word.length>=2;
    })
    const word = filterData[0].word;
    return word;
  } catch(err){
    console.log( "API오류",err);
    return null;
  }
};