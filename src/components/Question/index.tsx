type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};
function Question({ author, content }: QuestionsProps) {
  return (
    <div className="dark:bg-slate-700 rounded-lg shadow-lg p-6 ">
      <p className="text-slate-50">{content}</p>
      <footer className="flex justify-between mt-6 items-center">
        <div className="flex items-center gap-2">
          <img
            src={author.avatar}
            alt={author.name}
            className="rounded-full w-8"
          />
          <span className="text-slate-400 text-sm">{author.name}</span>
        </div>
        <div className=""></div>
      </footer>
    </div>
  );
}

export default Question;
