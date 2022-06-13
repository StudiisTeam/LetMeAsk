import { onValue, push, ref } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoImage from "../assets/images/LogoDark.svg";
import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomProps = {
  id: string;
};

export function Room() {
  const params = useParams<RoomProps>();
  const roomId = params.id;
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");

  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    push(ref(database, `/rooms/${roomId}/questions`), question);
    setNewQuestion("");
  }

  return (
    <div className="dark:bg-slate-800 dark:text-white ">
      <header className="p-6 border-b-[1px] dark:border-slate-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={logoImage} alt="" className="w-24" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="max-w-4xl md:mx-auto p-8">
        <div className="mt-8 mb-6 flex items-center gap-4 ">
          <h1 className="font-sans text-2xl">Sala {title}</h1>
          {questions.length > 0 && (
            <span className="bg-purple-600 rounded-full px-4 py-2 font-medium	text-sm">
              {questions.length} pergunta(s)
            </span>
          )}
        </div>

        <form className="" onSubmit={handleSendQuestion}>
          <textarea
            name=""
            id=""
            placeholder="O que voce quer perguntar"
            className="w-full border-0 p-4 rounded-lg dark:bg-slate-900 shadow-lg resize-y min-h-[130px]"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-full w-8"
                />
                <span className="text-slate-400 font-medium text-sm">
                  {user.name}
                </span>
              </div>
            ) : (
              <span className="text-sm flex md:gap-2 flex-col md:flex-row items-start text-slate-400 font-medium ">
                para enciar uma pergunta{" "}
                <button className="text-purple-600 underline text-sm font-medium">
                  Faca seu login
                </button>
              </span>
            )}
            <Button type="submit">Enviar pergunta?</Button>
          </div>
        </form>

        <div className="flex  flex-col gap-4 mt-8 ">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}