import React, { useState, useEffect } from "react";
const question = ["In the realm of literature, narratives weave intricate tapestries of emotion and imagination. Authors deftly craft characters imbued with depth and complexity, their lives unfolding across the pages like a delicate dance of words. Each sentence is a brushstroke, painting vivid landscapes of the mind, inviting readers to embark on journeys of discovery and introspection. From the haunting whispers of ancient myths to the vibrant rhythms of contemporary prose, literature serves as a gateway to worlds both familiar and fantastical, where the boundaries of reality blur and the human experience is laid bare.", "The universe, with its boundless expanse and unfathomable mysteries, beckons humanity to unravel its secrets through the lens of science. From the microscopic intricacies of cellular biology to the cosmic ballet of celestial bodies, the quest for knowledge transcends the limits of perception. Scientists labor tirelessly in laboratories and observatories, probing the fundamental laws that govern the cosmos and striving to decipher the language of nature. With each discovery, new question arise, fueling the eternal pursuit of understanding and pushing the boundaries of human achievement ever further.", "History, like an ancient tapestry woven from the threads of time, bears witness to the triumphs and tragedies of humanity's collective journey. From the rise and fall of empires to the struggles for freedom and justice, the past serves as a repository of lessons learned and forgotten. Through the annals of time, civilizations have flourished and faltered, leaving behind legacies that shape the course of future generations. By studying the narratives of the past, we gain insights into the complexities of human nature and the forces that shape our shared destiny.", "In the realm of philosophy, the quest for meaning and truth unfolds through a dialectic of inquiry and contemplation. Philosophers grapple with profound question that transcend the boundaries of empirical knowledge, probing the nature of existence, consciousness, and morality. Through the rigorous examination of ideas and concepts, they seek to illuminate the fundamental principles that underpin the human experience. From the metaphysical musings of ancient sages to the existential quandaries of modern thinkers, philosophy invites us to ponder the mysteries of existence and engage in the pursuit of wisdom.", "In the digital age, technology has become the engine driving human progress and innovation. From the advent of the internet to the dawn of artificial intelligence, technological advancements have reshaped the fabric of society and revolutionized the way we live, work, and communicate. In laboratories and workshops around the world, engineers and inventors harness the power of science and imagination to create tools and technologies that push the boundaries of what is possible. With each breakthrough, the boundaries of human potential expand, opening new frontiers of discovery and ushering in a future limited only by the bounds of our imagination."]
const randomIndex = Math.floor(Math.random() * question.length);

function App() {

  const [para, setPara] = useState({
    typed: question[randomIndex]
  })
  const [timer, setTimer] = useState(60);
  const [finished, setFinished] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);


  function handleChange(e) {
    const typedText = e.target.value;
    var updatedText = [];
    var correctWordsCount = 0;
    
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === question[randomIndex][i]) {
        updatedText.push(<span className="right">{question[randomIndex][i]}</span>);

      } else {
        updatedText.push(<span className="wrong">{question[randomIndex][i]}</span>);
      }
    }
    for (let i = typedText.length; i < question[randomIndex].length; i++) {
      updatedText.push(<span className="jo">{question[randomIndex][i]}</span>);
    }
    setPara({
      typed: updatedText
    })
    const typedWords = typedText.trim().split(/\s+/);
    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === question[randomIndex].trim().split(/\s+/)[i]) {
        correctWordsCount++;
      }
    
    }
    setCorrectWords(correctWordsCount);
    

  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setPara(null);
      setFinished(true);
    }
  }, [timer]);
  

  return (
    <div className="container">
      {para && (
        <>
          <h1>You Are typing....</h1>
          <div><h1>{para.typed}</h1></div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px' }}><h1>Timer: {timer}s</h1></div>
          <form>
            <input name="type" placeholder="Type" onChange={handleChange} autoFocus autoComplete="off" />
          </form>
        </>
      )}
      {finished && (
        <div>
          <h1 style={{ textAlign: 'center' }}>Your typing speed is {Math.round((correctWords / 30) * 60)} WPM.</h1>
          {/* <h1 style={{ textAlign: 'center' }}>Your Accuracy is {Math.round(((wrongWordsCount)/totalWords) * 100)} %.</h1> */}
        </div>
      )}
    </div>
  );
}


export default App;
