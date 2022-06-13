import illustrationImg from "../assets/images/illustration.svg";
import Button from "../components/Button";
import logoDarkImg from "../assets/images/LogoDark.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { push, ref } from "firebase/database";

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const navigate = useNavigate();

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }
    const firebaseNewRoom = push(ref(database, "rooms/"), {
      title: newRoom,
      userId: user?.id,
    });

    navigate(`/rooms/${firebaseNewRoom.key}`);
  }

  return (
    <div className="dark:bg-slate-800	text-slate-500 md:flex md:flex-row justify-center items-stretch	h-screen">
      <aside className="md:flex-[7] flex justify-center flex-col px-16 py-8 md:py-32 bg-no-repeat	bg-center	 bg-[url(/src/assets/background.svg)] bg-purple-600">
        <div className="mx-auto">
          <img
            src={illustrationImg}
            alt="ilustracao simbolizando perguntas e respostas"
            className="max-w-xs hidden md:block"
          />
          <strong className="font-bold dark:text-white	font-sans text-4xl mt-4">
            Crie salas de Q&A ao-vivo
          </strong>

          <p className="text-2xl	mt-2 dark:text-slate-100	">
            tire duvidas da sua audiencia em tempo real
          </p>
        </div>
      </aside>

      <main className="md:flex-[8] px-8 pt-6 flex justify-center items-center ">
        <div className="flex flex-col w-full max-w-xs items-stretch text-center">
          <img src={logoDarkImg} alt="" className="self-center" />

          <h1>Seja bem-vindo(a) {user?.name}</h1>
          <h2 className="text-2xl font-sans my-6 text-white">
            Criar uma nova sala
          </h2>
          <form
            onSubmit={handleCreateNewRoom}
            className="mb-4 flex items-stretch flex-col gap-4"
          >
            <input
              className="w-full h-12 bg-transparent rounded-lg px-4 border border-slate-700	dark:text-white"
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">Criar sala</Button>
          </form>
          <span>
            Quer entrar em uma sala já existente?
            <Link to="/" className="text-purple-500 underline ml-1">
              Clique aqui
            </Link>
          </span>
        </div>
      </main>
    </div>
  );
}
